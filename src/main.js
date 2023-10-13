const fetch = require('node-fetch');
const cheerio = require('cheerio');

class Dumper {

    constructor() {
        this.base_url = 'https://old.unsri.ac.id/';
    }


    async Faculty_Data() {

        try {

            const req = await fetch(this.base_url + '?act=daftar_mahasiswa');

            const res = await req.text();
            const $ = cheerio.load(res);
            const howFaculty = $('#content-front-left > div.mainContent-news-element > table > tbody > tr:nth-child(2) > td > ul > li').length;
            
            let data = [];
            for (let i = 1; i <= howFaculty; i++) {

                const facultyName = $('#content-front-left > div.mainContent-news-element > table > tbody > tr:nth-child(2) > td > ul > li:nth-child('+ i +') > b').text();
                const yearsUrl = $('#content-front-left > div.mainContent-news-element > table > tbody > tr:nth-child(2) > td > ul > li:nth-child('+ i +') > a').map((i, el) => $(el).attr('href')).get();

                data.push({
                    faculty: facultyName,
                    url: yearsUrl
                });
            }

            return data;

            
        } catch (e) {
            throw new Error(e);
        }

    }

    async Processing_Data(url) {

        try {

            const req = await fetch(this.base_url + url);

            const res = await req.text();
            const $ = cheerio.load(res);
            const dataLength = $('#content-front-left > div.mainContent-news-element > table > tbody > tr:nth-child(2) > td > table > tbody > tr').length;

            if (!dataLength) {
                return [];
            } else {
                let data = [];
                for (let i = 3; i <= dataLength; i++) {

                    const id = i - 2;
                    const img = $('#content-front-left > div.mainContent-news-element > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child('+ i +') > td:nth-child(2) > a > img').attr('src');
                    const name = $('#content-front-left > div.mainContent-news-element > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child('+ i +') > td:nth-child(3)').text().trim();
                    const nim = $('#content-front-left > div.mainContent-news-element > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child('+ i +') > td:nth-child(4)').text().trim();

                    data.push({
                        id: id,
                        img: img,
                        name: name,
                        nim: nim
                    });
                }

                return data;
            }
            
        } catch (e) {
            throw new Error(e);
        }

    }

}

module.exports = Dumper;