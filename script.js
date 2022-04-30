
document.addEventListener('DOMContentLoaded', function (tab) {
    document.querySelector('#texto').focus();
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        document.getElementById('texto').value = tabs[0].url;
        mostra_imagem(tabs[0].url, 'HD');
    });

    document.querySelector('#btn').addEventListener('click', function () {
        var url = document.querySelector('#texto').value;
        let checkbox = document.getElementById('switch');
        if (checkbox.checked) {
            download_imagem(url, "SD");
        } else {
            download_imagem(url, "HD");
        }
        // download_imagem(url , opcaoValor);
    });
    document.querySelector('#switch').addEventListener('click', function () {
        var url = document.querySelector('#texto').value;
        let checkbox = document.getElementById('switch');
        if (checkbox.checked) {
            mostra_imagem(url, "HD");
        } else {
            mostra_imagem(url, "SD");
        }
    });
    function mostra_imagem(url, resolucao) {
        var img = document.querySelector("#image");
        if (url.substr(0, 32) == 'https://www.youtube.com/watch?v=') {
            VID_REGEX = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

            if (resolucao === 'HD') {
                img.setAttribute('src', 'http://img.youtube.com/vi/' + url.match(VID_REGEX)[1] + '/maxresdefault.jpg');
            } else {
                img.setAttribute('src', 'http://img.youtube.com/vi/' + url.match(VID_REGEX)[1] + '/mqdefault.jpg');
            }
        } else {
            img.setAttribute('src', 'assets/youtube-erro.png');

        }
    }
    function download_imagem(url, resolucao) {
        if (url.substr(0, 32) == 'https://www.youtube.com/watch?v=') {
            VID_REGEX = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
            var dateNow = Date.now();

            if (resolucao === 'HD') {
                fetch('http://img.youtube.com/vi/' + url.match(VID_REGEX)[1] + '/maxresdefault.jpg').then(async (result) => {
                    const blob = await result.blob();// recuperandoo um blob para baixar
                    const anchor = window.document.createElement('a');

                    anchor.href = window.URL.createObjectURL(blob);
                    anchor.download = 'thumbD-' + dateNow + '.png';
                    anchor.click();
                    window.URL.revokeObjectURL(anchor.href);
                });
            } else {
                fetch('http://img.youtube.com/vi/' + url.match(VID_REGEX)[1] + '/mqdefault.jpg').then(async (result) => {
                    const blob = await result.blob();// recuperandoo um blob para baixar
                    const anchor = window.document.createElement('a');

                    anchor.href = window.URL.createObjectURL(blob);
                    anchor.download = 'thumbD-' + dateNow + '.png';
                    anchor.click();
                    window.URL.revokeObjectURL(anchor.href);
                });
            }
        } else {            
            var img = document.querySelector("#image");
            img.setAttribute('src', 'assets/youtube-erro.png');

        }
    }
})