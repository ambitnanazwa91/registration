const username = document.querySelector('#username')
const pass = document.querySelector('#password')
const pass2 = document.querySelector('#password2')
const email = document.querySelector('#email')
const sendBtn = document.querySelector('.send')
const clearBtn = document.querySelector('.clear')
const popup = document.querySelector('.popup')

const showError = (input, msg) => {
	// input - przechowuje element z tablicy, zaś msg przechowuje placeholder elementu
	const formBox = input.parentElement
	const errorMsg = formBox.querySelector('.error-text')
	console.log(errorMsg)

	formBox.classList.add('error')
	errorMsg.textContent = msg

	console.log(formBox)
}

const clearErorr = input => {
	const formBox = input.parentElement

	formBox.classList.remove('error')
}

const checkForm = input => {
	console.log(input)
	input.forEach(el => {
		if (el.value === '') {
			console.log('error')
			showError(el, el.placeholder)
		} else {
			clearErorr(el)
		}
	})
}
// input zawiera całą tablice nszych inputów, którą przekazujemy przez kliknięcie w send  i tą tablice nazywamy input w fukncji powyzej. następnie robimy pętle for ech dla każego ELementu , czyli każdego diva i tam nakażym el div sprawdzamy czy jest puste value, jeśli tak to pokazujemy showError, które pobiera dwa elementy. czyli el, czyli sam div, oraz placeholder tego diva (inputa), show eror funkcja tworzy zmiennąz awierajćą rodzica inputa czyli formBoxa, oraz tworzy zienną która będzie posiadać text z placeholdera, dodaje do formboxa clase error, oraz w textcontent errormsg daje zawartość placeholdera . jeśli else to robimy clear error, którzy przekazuje tylko el (diva/inputa) więc ta funkcja tworzy sobie zmienną, która prechodzi do rodzica i z rodzica usuwamy error klase, jeśli jest.

const checkLength = (input, min) => {
	if (input.value.length < min) {
		showError(input, `${input.previousElementSibling.innerText.slice(0, -1)} powinno się składać z min.${min} znaków`)
	}
}

const checkPassword = (pass1, pass2) => {

	if (pass1.value !== pass2.value) {
		showError(pass2, 'Hasła do siebie nie pasują.')
	}
}

const checkEmail = email => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	if (re.test(email.value)) {
		clearErorr(email)
	} else {
		showError(email, 'Email jest niepoprawny')
	}
}

const checkErrors = () => {
	const allInputs = document.querySelectorAll('.form-box')
	let countErrors = 0

	allInputs.forEach(el => {
		if (el.classList.contains('error')) {
			countErrors++
		}
	})

	if (countErrors === 0) {
		popup.classList.add('show-popup')
	}

	console.log(countErrors)
}

sendBtn.addEventListener('click', e => {
	e.preventDefault()

	checkForm([username, pass, pass2, email]) // przekazujemy tu tablice zmiennych jako argument (czyli inpouty)
	checkLength(username, 3)
	checkLength(pass, 8)
	checkPassword(pass, pass2)
	checkEmail(email)
	checkErrors()
})

clearBtn.addEventListener('click', e => {
	e.preventDefault() // przyciski w form domyślnie są type submit , ta metoda powodje, żę przeglądarka nie traktuje tak tego przycisku (jako submit)
	;[username, pass, pass2, email].forEach(el => {
		// tutaj mamy tablice która zawiera każdą zmienną z inputów, zś foreach bierze każdy element tej tablicy i nadaje mu value '' czyli zerujemy zawartość jeśli coś tam jest wpisane
		el.value = ''
		clearErorr(el)
	})
})
