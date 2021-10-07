(() => {
	// validate inputs
	const warnLabels = document.querySelectorAll('.form__label--warn');

	const bill = document.querySelector('#bill');
	const tips = document.querySelectorAll('input[name=tip]');
	const people = document.querySelector('#people');

	let billVal = 0,
		tipVal = 0,
		peopleVal = 0;

	bill.addEventListener('input', (ev) => {
		billVal = parseFloat(ev.target.value);
		updateResults();
		validateInput(bill, warnLabels[0]);
	});

	for (const tip of tips) {
		tip.addEventListener('input', (ev) => {
			tipVal = parseFloat(ev.target.value);
			if (tip !== tips[5]) tips[5].value = '';
			validateInput(bill, warnLabels[0]);
			updateResults();
		});
	}

	// uncheck other tips when input changes on custom tip
	tips[5].addEventListener('focus', () => {
		tips[5].addEventListener('input', () => {
			for (const tip of tips) {
				tip.checked = false;
			}
		});
	});

	people.addEventListener('input', (ev) => {
		peopleVal = parseFloat(ev.target.value);
		updateResults();
		validateInput(people, warnLabels[1]);
	});

	bill.addEventListener('blur', () => validateInput(bill, warnLabels[0]));
	people.addEventListener('blur', () => validateInput(people, warnLabels[1]));

	// calculate results
	const tipResultElem = document.querySelector('#tip-result');
	const totalResultElem = document.querySelector('#total-result');

	const calcTipAmount = () => {
		const tipSum = (billVal * tipVal) / 100;
		return tipSum / peopleVal;
	};

	const calcTotal = () => {
		const sum = billVal + (billVal * tipVal) / 100;
		return sum / peopleVal;
	};

	function updateResults() {
		if (billVal > 0 && peopleVal > 0) {
			resetBtn.removeAttribute('disabled');
			tipResultElem.innerHTML = `$${calcTipAmount().toFixed(2)}`;
			totalResultElem.innerHTML = `$${calcTotal().toFixed(2)}`;
		}
	}

	function validateInput(input, warnElem) {
		if (!input.value) {
			input.classList.add('form__input--warn');
			warnElem.style.display = 'block';
		} else {
			input.classList.remove('form__input--warn');
			warnElem.style.display = 'none';
		}
	}

	// reset form
	const resetBtn = document.querySelector('#reset-form-btn');
	resetBtn.addEventListener('click', () => {
		document.forms[0].reset();

		billVal = 0;
		tipVal = 0;
		peopleVal = 0;

		resetBtn.setAttribute('disabled', true);
		tipResultElem.innerHTML = '$0.00';
		totalResultElem.innerHTML = '$0.00';
	});
})();
