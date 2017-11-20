const http = require("http");
const superagent = require("superagent");
const cheerio = require("cheerio");
const eventproxy = require("eventproxy");

const url = "http://www.hkexnews.hk/sdw/search/mutualmarket_c.aspx";

const results = [];

function start() {
	superagent.post(url).type("form").send({ ddlShareholdingDay: 15, ddlShareholdingMonth: 10, ddlShareholdingYear: 2017 }).end((err, pres) => {
		const $ = cheerio.load(pres.text);
		$("#pnlResult table tr").each(function(idx, ele) {
			const $ele = $(ele);
			const $stockMessages = $ele.find("td");
			if(idx > 1) {
				results.push({
					code: $stockMessages.eq(0).text().trim(),
					name: $stockMessages.eq(1).text().trim(),
					stockNum: $stockMessages.eq(2).text().trim(),
					stockPercent: $stockMessages.eq(3).text().trim()
				})
			}
		});
		results.forEach(item => {
			console.log(`${item.code} ${item.name} ${item.stockNum} ${item.stockPercent}\n`)
		})
	})
}

start();
