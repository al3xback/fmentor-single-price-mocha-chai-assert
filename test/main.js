import { assert } from 'chai';
import jsdom from 'jsdom';
import got from 'got';

const { JSDOM } = jsdom;

const url =
	'https://al3xback.github.io/fmentor-single-price-mocha-chai-assert/';

const getData = () => {
	return got(url)
		.then((res) => {
			const { document } = new JSDOM(res.body).window;
			return document;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

describe('DOM', () => {
	beforeEach(async () => {
		try {
			const document = await getData();
			global.document = document;
		} catch (err) {
			console.log(err);
		}
	});

	it('should have a string type of card mark content element', () => {
		const cardMarkContent =
			document.querySelector('.card__mark').textContent;

		assert.typeOf(cardMarkContent, 'string');
	});

	it("should have a title element that contains 'Join our community' word in first section element", () => {
		const sectionEls = document.querySelectorAll('section');
		const firstSectionEl = sectionEls[0];
		const cardTitleEl = firstSectionEl.querySelector('.card__title');
		const cardTitle = cardTitleEl.textContent.trim();

		assert.equal(cardTitle, 'Join our community');
	});

	it('should have three section elements', () => {
		const sectionEls = document.querySelectorAll('section');

		assert.lengthOf(sectionEls, 3);
	});

	it("should have a word 'Coding exercises' as one of why us points", () => {
		const whyUsPointEls = document.querySelectorAll('.card__list li');

		const whyUsPoints = [];

		for (let i = 0; i < whyUsPointEls.length; i++) {
			const whyUsPoint = whyUsPointEls[i].textContent;
			whyUsPoints.push(whyUsPoint);
		}

		assert.include(whyUsPoints, 'Coding exercises');
	});
});
