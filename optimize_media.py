from pathlib import Path
from PIL import Image
import subprocess
import shutil


# =========================================================
# 085 FILMES - MEDIA OPTIMIZER V2
# =========================================================


# =========================================================
# CONFIGURAÇÃO
# =========================================================

BASE_DIR = Path(__file__).resolve().parent

ORIGINAL_IMAGES = BASE_DIR / "assets" / "originals" / "images"
ORIGINAL_VIDEOS = BASE_DIR / "assets" / "originals" / "videos"

OPTIMIZED_IMAGES = BASE_DIR / "assets" / "optimized" / "images"
OPTIMIZED_VIDEOS = BASE_DIR / "assets" / "optimized" / "videos"
OPTIMIZED_POSTERS = BASE_DIR / "assets" / "optimized" / "posters"


IMAGE_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png"
}


VIDEO_EXTENSIONS = {
    ".mov",
    ".mp4",
    ".m4v",
    ".avi",
    ".mkv",
    ".webm"
}


# -------------------------
# IMAGENS
# -------------------------

WEBP_QUALITY = 88

# Não deixa imagens gigantes entrarem no site.
MAX_IMAGE_WIDTH = 2000


# -------------------------
# VÍDEOS
# -------------------------

# 22 = ótimo equilíbrio para web.
#
# 18 = qualidade muito alta / maior
# 20 = alta qualidade
# 22 = recomendado para web
# 24 = mais compressão
VIDEO_CRF = 22

# Preset influencia eficiência de compressão.
# slow gera arquivos menores mantendo qualidade,
# porém demora mais para processar.
VIDEO_PRESET = "slow"

MAX_VIDEO_HEIGHT = 1080

AUDIO_BITRATE = "128k"

POSTER_QUALITY = 86
MAX_POSTER_WIDTH = 1600


# =========================================================
# FFMPEG
# =========================================================

FFMPEG_PATH = shutil.which("ffmpeg")


# =========================================================
# UTILIDADES
# =========================================================

def ensure_folders():
    """
    Garante que todas as pastas existam.
    """

    ORIGINAL_IMAGES.mkdir(
        parents=True,
        exist_ok=True
    )

    ORIGINAL_VIDEOS.mkdir(
        parents=True,
        exist_ok=True
    )

    OPTIMIZED_IMAGES.mkdir(
        parents=True,
        exist_ok=True
    )

    OPTIMIZED_VIDEOS.mkdir(
        parents=True,
        exist_ok=True
    )

    OPTIMIZED_POSTERS.mkdir(
        parents=True,
        exist_ok=True
    )


def ffmpeg_exists():
    """
    Verifica se o FFmpeg foi localizado.
    """

    return FFMPEG_PATH is not None


def format_size(size_bytes):
    """
    Converte bytes para MB.
    """

    mb = size_bytes / (1024 * 1024)

    return f"{mb:.2f} MB"


def calculate_reduction(original_size, optimized_size):
    """
    Calcula a redução percentual.
    """

    if original_size == 0:
        return 0

    reduction = (
        1 -
        optimized_size / original_size
    ) * 100

    return reduction


def print_result(
    media_type,
    input_path,
    output_path,
    original_size,
    optimized_size
):
    """
    Exibe relatório resumido do arquivo.
    """

    reduction = calculate_reduction(
        original_size,
        optimized_size
    )

    saved_bytes = (
        original_size -
        optimized_size
    )

    print()
    print(
        f"[{media_type} OK] "
        f"{input_path.name}"
    )

    print(
        f"  Original:    "
        f"{format_size(original_size)}"
    )

    print(
        f"  Otimizado:   "
        f"{format_size(optimized_size)}"
    )

    print(
        f"  Economia:    "
        f"{format_size(saved_bytes)} "
        f"({reduction:.1f}%)"
    )

    print(
        f"  Saída:       "
        f"{output_path.name}"
    )

    print()


# =========================================================
# IMAGENS
# =========================================================

def optimize_image(input_path: Path):

    output_path = (
        OPTIMIZED_IMAGES /
        f"{input_path.stem}.webp"
    )

    # Não sobrescreve
    if output_path.exists():

        print(
            f"[IGNORADO] "
            f"Já existe: {output_path.name}"
        )

        return


    try:

        original_size = (
            input_path.stat().st_size
        )


        with Image.open(input_path) as img:

            # -------------------------
            # ORIENTAÇÃO EXIF
            # -------------------------

            try:
                from PIL import ImageOps

                img = ImageOps.exif_transpose(img)

            except Exception:
                pass


            # -------------------------
            # CORES
            # -------------------------

            if img.mode not in (
                "RGB",
                "RGBA"
            ):

                if "A" in img.getbands():

                    img = img.convert("RGBA")

                else:

                    img = img.convert("RGB")


            # -------------------------
            # REDIMENSIONAMENTO
            # -------------------------

            if img.width > MAX_IMAGE_WIDTH:

                ratio = (
                    MAX_IMAGE_WIDTH /
                    img.width
                )

                new_height = int(
                    img.height *
                    ratio
                )

                img = img.resize(
                    (
                        MAX_IMAGE_WIDTH,
                        new_height
                    ),
                    Image.Resampling.LANCZOS
                )


            # -------------------------
            # WEBP
            # -------------------------

            img.save(
                output_path,
                "WEBP",
                quality=WEBP_QUALITY,
                method=6
            )


        optimized_size = (
            output_path.stat().st_size
        )


        # -------------------------
        # SEGURANÇA
        # -------------------------

        # Se por algum motivo a versão WebP
        # ficar maior que o original,
        # descartamos.

        if optimized_size >= original_size:

            output_path.unlink(
                missing_ok=True
            )

            print()
            print(
                f"[DESCARTADO] "
                f"{input_path.name}"
            )

            print(
                "  A versão WebP ficou "
                "maior ou igual ao original."
            )

            print(
                "  O arquivo original "
                "foi preservado."
            )

            print()

            return


        print_result(
            "IMAGEM",
            input_path,
            output_path,
            original_size,
            optimized_size
        )


    except Exception as e:

        if output_path.exists():
            output_path.unlink(
                missing_ok=True
            )

        print()
        print(
            f"[ERRO IMAGEM] "
            f"{input_path.name}"
        )

        print(
            f"  {e}"
        )

        print()


# =========================================================
# VÍDEOS
# =========================================================

def optimize_video(input_path: Path):

    output_path = (
        OPTIMIZED_VIDEOS /
        f"{input_path.stem}.mp4"
    )


    # -------------------------
    # NÃO SOBRESCREVER
    # -------------------------

    if output_path.exists():

        print(
            f"[IGNORADO] "
            f"Já existe: "
            f"{output_path.name}"
        )

        return


    original_size = (
        input_path.stat().st_size
    )


    print()
    print(
        f"[PROCESSANDO VÍDEO] "
        f"{input_path.name}"
    )

    print(
        f"  Tamanho original: "
        f"{format_size(original_size)}"
    )


    # =====================================================
    # FILTRO DE ESCALA
    # =====================================================
    #
    # Se a altura for maior que 1080:
    # reduz para 1080.
    #
    # Se já for menor:
    # mantém.
    #
    # A largura é calculada automaticamente.
    #
    # -2 garante dimensões pares,
    # necessárias para H.264.
    # =====================================================

    video_filter = (
        "scale="
        "-2:"
        f"'min({MAX_VIDEO_HEIGHT},ih)'"
    )


    command = [

        FFMPEG_PATH,

        "-hide_banner",

        "-i",
        str(input_path),

        # -------------------------
        # VIDEO
        # -------------------------

        "-vf",
        video_filter,

        "-c:v",
        "libx264",

        "-preset",
        VIDEO_PRESET,

        "-crf",
        str(VIDEO_CRF),

        "-pix_fmt",
        "yuv420p",

        # -------------------------
        # ÁUDIO
        # -------------------------

        "-c:a",
        "aac",

        "-b:a",
        AUDIO_BITRATE,

        # -------------------------
        # WEB OPTIMIZATION
        # -------------------------

        "-movflags",
        "+faststart",

        # -------------------------
        # SAÍDA
        # -------------------------

        "-y",

        str(output_path)
    ]


    try:

        subprocess.run(
            command,
            check=True
        )


        # Verifica se FFmpeg realmente
        # gerou o arquivo.

        if not output_path.exists():

            print(
                "[ERRO] O FFmpeg terminou "
                "mas nenhum arquivo foi gerado."
            )

            return


        optimized_size = (
            output_path.stat().st_size
        )


        # =================================================
        # PROTEÇÃO CONTRA ARQUIVO MAIOR
        # =================================================

        if optimized_size >= original_size:

            output_path.unlink(
                missing_ok=True
            )

            if input_path.suffix.lower() == ".mp4":

                shutil.copy2(
                    input_path,
                    output_path
                )

                print()
                print(
                    f"[ORIGINAL MANTIDO]\n"
                    f"{input_path.name}\n"
                    "Recompressão não trouxe benefício.\n"
                    "Original compatível foi copiado para optimized/videos.\n"
                    f"Tamanho: {format_size(output_path.stat().st_size)}"
                )
                print()

                return

            print()
            print(
                "[DESCARTADO]"
            )
            print(
                f"  Arquivo: {input_path.name}"
            )
            print(
                f"  Original: {format_size(original_size)}"
            )
            print(
                f"  Gerado:   {format_size(optimized_size)}"
            )
            print(
                "  A conversão MP4 ficou maior e foi removida."
            )
            print(
                "  Como a origem não é MP4, ela não foi copiada para optimized/videos."
            )
            print(
                "  O original permanece intacto."
            )
            print()

            return


        print_result(
            "VÍDEO",
            input_path,
            output_path,
            original_size,
            optimized_size
        )


    except subprocess.CalledProcessError as e:

        if output_path.exists():
            output_path.unlink(
                missing_ok=True
            )

        print()
        print(
            f"[ERRO VÍDEO] "
            f"{input_path.name}"
        )

        print(
            f"  FFmpeg retornou "
            f"código {e.returncode}"
        )

        print()


    except Exception as e:

        if output_path.exists():
            output_path.unlink(
                missing_ok=True
            )

        print()
        print(
            f"[ERRO VÍDEO] "
            f"{input_path.name}"
        )

        print(
            f"  {e}"
        )

        print()


# =========================================================
# POSTERS
# =========================================================

def generate_poster(video_path: Path):

    output_path = (
        OPTIMIZED_POSTERS /
        f"{video_path.stem}.webp"
    )

    if output_path.exists():

        print(
            f"[IGNORADO] Poster já existe\n"
            f"  Origem: {video_path}\n"
            f"  Saída:  {output_path}"
        )

        return

    if not ffmpeg_exists():

        print(
            f"[ERRO POSTER] FFmpeg não foi encontrado\n"
            f"  Origem: {video_path}\n"
            f"  Saída:  {output_path}"
        )

        return

    last_error = "Nenhum frame foi extraído."

    for seek_time in ("3", "1", "0"):

        command = [
            FFMPEG_PATH,
            "-hide_banner",
            "-loglevel",
            "error",
            "-ss",
            seek_time,
            "-i",
            str(video_path),
            "-frames:v",
            "1",
            "-vf",
            f"scale=w='min({MAX_POSTER_WIDTH},iw)':h=-2",
            "-c:v",
            "libwebp",
            "-quality",
            str(POSTER_QUALITY),
            "-compression_level",
            "6",
            "-an",
            "-n",
            str(output_path)
        ]

        try:

            result = subprocess.run(
                command,
                check=False,
                capture_output=True,
                text=True
            )

            if (
                result.returncode == 0
                and output_path.exists()
                and output_path.stat().st_size > 0
            ):

                print(
                    f"[POSTER OK]\n"
                    f"  Origem: {video_path}\n"
                    f"  Saída:  {output_path}\n"
                    f"  Frame:  {seek_time}s"
                )

                return

            last_error = (
                result.stderr.strip()
                or "O FFmpeg não gerou um poster válido."
            )

        except Exception as error:

            last_error = str(error)

        output_path.unlink(missing_ok=True)

    print(
        f"[ERRO POSTER] {video_path.name}\n"
        f"  Origem: {video_path}\n"
        f"  Saída:  {output_path}\n"
        f"  Detalhe: {last_error}"
    )


def process_posters():

    print(
        "=== GERANDO POSTERS ==="
    )

    print()

    files = sorted([

        file

        for file
        in OPTIMIZED_VIDEOS.iterdir()

        if (
            file.is_file()
            and
            file.suffix.lower()
            in VIDEO_EXTENSIONS
        )

    ])

    if not files:

        print(
            "Nenhum vídeo otimizado encontrado para gerar posters."
        )

        print()

        return

    print(
        f"{len(files)} vídeo(s) otimizado(s) encontrado(s)."
    )

    print()

    for file in files:

        try:
            generate_poster(file)

        except Exception as error:

            output_path = (
                OPTIMIZED_POSTERS /
                f"{file.stem}.webp"
            )

            print(
                f"[ERRO POSTER] {file.name}\n"
                f"  Origem: {file}\n"
                f"  Saída:  {output_path}\n"
                f"  Detalhe: {error}"
            )


# =========================================================
# PROCESSAMENTO DE IMAGENS
# =========================================================

def process_images():

    print(
        "=== PROCESSANDO IMAGENS ==="
    )

    print()


    files = sorted([

        file

        for file
        in ORIGINAL_IMAGES.iterdir()

        if (
            file.is_file()
            and
            file.suffix.lower()
            in IMAGE_EXTENSIONS
        )

    ])


    if not files:

        print(
            "Nenhuma imagem encontrada."
        )

        print()

        return


    print(
        f"{len(files)} "
        f"imagem(ns) encontrada(s)."
    )

    print()


    for file in files:

        optimize_image(file)


# =========================================================
# PROCESSAMENTO DE VÍDEOS
# =========================================================

def process_videos():

    print(
        "=== PROCESSANDO VÍDEOS ==="
    )

    print()


    files = sorted([

        file

        for file
        in ORIGINAL_VIDEOS.iterdir()

        if (
            file.is_file()
            and
            file.suffix.lower()
            in VIDEO_EXTENSIONS
        )

    ])


    if not files:

        print(
            "Nenhum vídeo encontrado."
        )

        print()

        return


    # -------------------------
    # FFMPEG
    # -------------------------

    if not ffmpeg_exists():

        print(
            "[ERRO] "
            "FFmpeg não foi encontrado."
        )

        print(
            "Instale o FFmpeg ou "
            "adicione-o ao PATH."
        )

        print()

        return


    print(
        f"{len(files)} "
        f"vídeo(s) encontrado(s)."
    )

    print()

    print(
        "FFmpeg:"
    )

    print(
        FFMPEG_PATH
    )

    print()


    for file in files:

        optimize_video(file)


# =========================================================
# MAIN
# =========================================================

def main():

    print()

    print(
        "======================================"
    )

    print(
        "   085 FILMES - MEDIA OPTIMIZER V2"
    )

    print(
        "======================================"
    )

    print()


    ensure_folders()


    process_images()

    process_videos()

    process_posters()


    print()
    print(
        "======================================"
    )

    print(
        "Processamento finalizado."
    )

    print(
        "Os arquivos originais "
        "não foram alterados."
    )

    print(
        "======================================"
    )

    print()


if __name__ == "__main__":
    main()