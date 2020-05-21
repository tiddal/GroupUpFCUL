export const validate = (value, rules) => {
	let valid = true;
	let msg = '';

	if (rules.required) {
		valid = value.trim() !== '' && valid;
		if (!valid) msg = 'Este campo é obirgatório.';
	}

	if (rules.username) {
		const pattern = /[FfCc][0-9]{5}$/;
		valid = pattern.test(value) && valid;
		if (!valid && !msg) msg = 'O número deve respeitar o formato "fc00000".';
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

	return [valid, msg];
};
