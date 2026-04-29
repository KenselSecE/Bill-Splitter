// get button n results section
const calculateBtn = document.getElementById('btn-calculate');
const resultsSection = document.getElementById('results-section');
const clearBtn = document.getElementById('btn-clear');

function hideReceipt() {
  resultsSection.style.animation = 'slideUp 0.3s ease forwards';
  setTimeout(function() {
	resultsSection.classList.add('hidden');
	resultsSection.style.animation = '';
  }, 300);
}

clearBtn.addEventListener('click', function() {
	//clear inputs
	document.getElementById('total-bill').value = '';
	document.getElementById('num-people').value = '';
	document.getElementById('tip-percent').value = '0';

	//clear errors
	document.getElementById('error-bill').textContent = '';
	document.getElementById('error-people').textContent = '';

	//hide reciept
	hideReceipt();
});

// listen for the button click
calculateBtn.addEventListener('click', function() {
	
	//read input values
	const subtotal = parseFloat(document.getElementById('total-bill').value);
	const people = parseInt(document.getElementById('num-people').value);
	const tip = parseFloat(document.getElementById('tip-percent').value) || 0;

	//Validation: clears errors
	document.getElementById('error-bill').textContent = '';
	document.getElementById('error-people').textContent = '';

	//validate
	let hasError = false;

	if (isNaN(subtotal) || subtotal <= 0) {
		document.getElementById('error-bill').textContent = 'Please enter a valid bill amount.';
		hasError = true;
	}

	if (isNaN(people) || people <= 0) {
		document.getElementById('error-people').textContent = 'Please enter a valid number of people.';
		hasError = true;
	}

	if (hasError) {
		hideReceipt();
		return;
	}

	//calculate
	const tipAmount = subtotal * (tip / 100);
	const total = subtotal + tipAmount;
	const perPerson = total / people;

	//animation fix
	resultsSection.style.animation = 'none';
	resultsSection.offsetHeight;
	resultsSection.style.animation = 'slideDown 0.4s ease';
	resultsSection.classList.remove('hidden');

	//display results
	document.getElementById('result-subtotal').textContent = "$" + subtotal.toFixed(2);
	document.getElementById('result-tip').textContent = "$" + tipAmount.toFixed(2);
	document.getElementById('result-total').textContent = "$" + total.toFixed(2);
	document.getElementById('result-per-person').textContent = "$" + perPerson.toFixed(2);
	document.getElementById('label-tip').textContent = "Tip (" + tip + "%)";
});