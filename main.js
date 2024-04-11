document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("get_data_form").addEventListener("submit", (e) => {
        e.preventDefault();

        const postCodeValue = document.getElementById('post_code').value;
        const regex = /\/([A-Za-z0-9_-]{11})\//;
        const match = postCodeValue.match(regex);

        if (match && match[1]) {
            const id = match[1];
            console.log("ID:", id);

            let info_div = document.getElementById('info_div');
            info_div.innerHTML = '<img src="./Hourglass.gif">';



            const data = null;

            const xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener('readystatechange', function () {
                if (this.readyState === this.DONE) {
                    if (xhr.status === 200) {
                        var response = JSON.parse(this.responseText);
                        if (response.__typename == "GraphVideo") {
                            console.log(response.video_url);
                            info_div.innerHTML = `<a target="_blank" href="${response.video_url}">View</a>`;
                        } else if (response.__typename == "GraphSidecar") {
                            console.log(response.display_url);
                            info_div.innerHTML = `<a target="_blank" href="${response.display_url}">View</a>`;
                        }
                    } else {
                        console.error('Request failed with status:', xhr.status);
                        info_div.innerHTML = `Request failed`;
                    }
                } else {
                    info_div.innerHTML = `Request failed`;
                }
            });

            xhr.open('GET', `https://instagram130.p.rapidapi.com/media-info?code=${id}`);
            xhr.setRequestHeader('X-RapidAPI-Key', 'YOUR_API_KEY');
            xhr.setRequestHeader('X-RapidAPI-Host', 'instagram130.p.rapidapi.com');

            xhr.send(data);
        } else {
            console.log("No ID found in the URL.");
            info_div.innerHTML = `URL Not found.`;
        }
    });
});