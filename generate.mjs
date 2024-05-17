import { createValueConfig } from "struct-fakerator";
import { faker } from "@faker-js/faker";

const createConfigFactory = (randomFn) => {
	return (options) => createValueConfig(() => randomFn(options));
};

const fnsMap = {
	int: createConfigFactory(faker.number.int),

	float: createConfigFactory(faker.number.float),

	email: createConfigFactory(faker.internet.email),

	fullName: createConfigFactory(faker.person.fullName),

	price: createConfigFactory(faker.commerce.price),

	date: createConfigFactory(faker.date.anytime),
};

export const customMatch = (config) => {
	const createRandomFnConfig = fnsMap[config?.type];
	if (createRandomFnConfig) {
		return createRandomFnConfig(config.options);
	}

	throw Error("not match custom type");
};
