// const {clipoard} = require('electron');

function checkVideoStatus() {
    if (document.getElementById("videoOutputEnable").checked) {
        document.getElementById("videoEnableDiv").style.display = "block";
    } else {
        document.getElementById("videoEnableDiv").style.display = "none";
    }
}

function checkAudioStatus() {
    if (document.getElementById("audioOutputEnable").checked) {
        document.getElementById("audioEnableDiv").style.display = "block";
    } else {
        document.getElementById("audioEnableDiv").style.display = "none";
    }
}

function showVideoOptions() {
    let vct = document.getElementById("videoCodecType");
    if (vct.value === "keep") {
        document.getElementById("videoEncoderOptions").style.display = "none";
    } else if (vct.value === "x264") {
        document.getElementById("videoEncoderOptions").style.display = "block";
        document.getElementById("x264Options").style.display = "block";
        document.getElementById("x265Options").style.display = "none";
    } else if (vct.value === "x265") {
        document.getElementById("videoEncoderOptions").style.display = "block";
        document.getElementById("x265Options").style.display = "block";
        document.getElementById("x264Options").style.display = "none";
    }
}

function updateX264Mode() {
    if (document.getElementById("video-cbr").checked) {
        document.getElementById("video-cbr-options").style.display = "block";
        document.getElementById("video-crf-options").style.display = "none";
    } else {
        document.getElementById("video-cbr-options").style.display = "none";
        document.getElementById("video-crf-options").style.display = "block";

    }
}

function showAudioOptions() {
    let vct = document.getElementById("audioCodecType");
    if (vct.value === "keep") {
        document.getElementById("audioEncoderOptions").style.display = "none";
    } else if (vct.value === "aac") {
        document.getElementById("audioEncoderOptions").style.display = "block";
        document.getElementById("aacOptions").style.display = "block";
        document.getElementById("opusOptions").style.display = "none";
    } else if (vct.value === "opus") {
        document.getElementById("audioEncoderOptions").style.display = "block";
        document.getElementById("opusOptions").style.display = "block";
        document.getElementById("aacOptions").style.display = "none";
    }
}

function showCommand() {
    let cmd = "ffmpeg -i INPUT";
    if (document.getElementById("videoOutputEnable").checked) {
        let vct = document.getElementById("videoCodecType");
        if (vct.value === "x264") {
            cmd += " -c:v libx264";
            if (document.getElementById("video-no-b-frame").checked) {
                cmd += " -bf 0";
            }

            let profile = document.getElementById("video-profile").value;
            if (profile !== 'default') {
                cmd += ' -profile:v ' + profile;
            }

            if (document.getElementById("video-cbr").checked) {
                let bitrate = document.getElementById("video-bitrate").value;
                if (!bitrate) bitrate = '2048';
                let range = document.getElementById("video-bitrate-range").value;
                let maxrate = (parseInt(range) + 100) * parseInt(bitrate) / 100
                cmd += ` -b:v ${bitrate}k -maxrate ${maxrate}k -bufsize 2M`;
            } else {
                let value = document.getElementById("video-crf-options-value").innerText;
                cmd += " -crf " + value;
            }

        } else if (vct.value === "x265") {
            cmd += " -c:v libx265";
        } else {
            cmd += " -c:v copy";
        }
    } else {
        cmd += " -vn";
    }

    if (document.getElementById("audioOutputEnable").checked) {
        let vct = document.getElementById("audioCodecType");
        if (vct.value === "aac") {
            cmd += " -c:a libfdk_aac";
            let bitrate = document.getElementById("audio-bitrate").value;
            if (bitrate === '') {
                bitrate = '128';
            }
            cmd += " -b:a " + bitrate + "k";

            let channels = document.getElementById("audio-channel").value;
            if (channels === '') {
                channels = '2';
            }
            cmd += " -ac " + channels;

            let sampleRate = document.getElementById("audio-sampleRate").value;
            if (sampleRate !== '') {
                cmd += " -ar " + sampleRate;
            }

        } else if (vct.value === "opus") {
            cmd += " -c:a libopus";
        } else {
            cmd += " -c:a copy";
        }
    } else {
        cmd += " -an";
    }

    cmd += " OUTPUT";

    const element = document.getElementById("ffmpeg-command");
    if (element) element.innerText = cmd;
}
