export function validateFirstName(value: string): string | null {
	const trimmed = (value ?? "").trim();
	if (trimmed.length < 6) return "First name must be at least 6 characters.";
	if (!/^[A-Za-z]+$/.test(trimmed)) return "First name must contain letters only.";
	return null;
}

export function validateLastName(value: string): string | null {
	const trimmed = (value ?? "").trim();
	if (!trimmed) return "Last name is required.";
	return null;
}

export function validatePassword(value: string): string | null {
	const plain = value ?? "";
	if (plain.length < 6) return "Password must be at least 6 characters.";
	return null;
}

export function validateEmail(value: string): string | null {
	const trimmed = (value ?? "").trim();
	// Simple and practical email pattern
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(trimmed)) return "Enter a valid email (name@domain.com).";
	return null;
}

export function validateMobile(value: string): string | null {
	const digitsOnly = (value ?? "").trim();
	if (!/^\d{10}$/.test(digitsOnly)) return "Mobile number must be exactly 10 digits.";
	return null;
}

export function validateAddress(value: string): string | null {
	const trimmed = (value ?? "").trim();
	if (!trimmed) return "Address is required.";
	return null;
}

export function getErrors(fields: {
	firstName?: string;
	lastName?: string;
	password?: string;
	email?: string;
	mobile?: string;
	address?: string;
}): Partial<Record<keyof typeof fields, string>> {
	const errors: Partial<Record<keyof typeof fields, string>> = {};
	if (fields.firstName !== undefined) {
		const e = validateFirstName(fields.firstName);
		if (e) errors.firstName = e;
	}
	if (fields.lastName !== undefined) {
		const e = validateLastName(fields.lastName);
		if (e) errors.lastName = e;
	}
	if (fields.password !== undefined) {
		const e = validatePassword(fields.password);
		if (e) errors.password = e;
	}
	if (fields.email !== undefined) {
		const e = validateEmail(fields.email);
		if (e) errors.email = e;
	}
	if (fields.mobile !== undefined) {
		const e = validateMobile(fields.mobile);
		if (e) errors.mobile = e;
	}
	if (fields.address !== undefined) {
		const e = validateAddress(fields.address);
		if (e) errors.address = e;
	}
	return errors;
}


