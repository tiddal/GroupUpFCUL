export const validate = (value, rules) => {
	let valid = true;
	let msg = '';

	if (rules.required) {
		valid = value.trim() !== '' && valid;
		if (!valid) msg = 'Este campo é obrigatório.';
	}

	if (rules.username) {
		const pattern = /[FfCc][0-9]{5}$/;
		valid = pattern.test(value) && valid;
		if (!valid && !msg) msg = 'O número deve respeitar o formato "fc00000".';
	}

	if (rules.class) {
		const pattern = /[a-zA-Z]{1,2}[0-9]{1,2}$/;
		valid = pattern.test(value) && valid;
		if (!valid && !msg) msg = 'O número deve respeitar o formato "T1 ou TP1".';
	}

	if (rules.cycle) {
		const pattern = /[1-3]{1}$/;
		valid = pattern.test(value) && valid;
		if (!valid && !msg) msg = 'Escolha um cíclo válido.';
	}

	if (rules.semester) {
		const pattern = /[1-2]{1}$/;
		valid = pattern.test(value) && valid;
		if (!valid && !msg) msg = 'Escolha um semestre válido.';
	}

	if (rules.email) {
		const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		valid = pattern.test(value) && valid;
		if (!valid && !msg) msg = 'Insira um endereço de email válido.';
	}

	if (rules.name || rules.first_name || rules.last_name) {
		const pattern = /^[a-zA-Z\u00C0-\u017F ]+$/;
		valid = pattern.test(value) && valid;
		if (!valid && !msg) msg = 'Insira um nome válido.';
	}

	if (rules.match) {
		valid = value === rules.match;
	}

	if (rules.max) {
		valid = value.length < rules.max + 1;
		if (!valid && !msg)
			msg = 'Máximo de ' + rules.max + ' caracteres ultrapassado.';
	}

	return [valid, msg];
};
