import { fakerES as faker} from "@faker-js/faker"

export const generateUserMocks = (amount) => {
  const users = []

  for(let i = 0; i < amount; i++){
    const user = {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        age: faker.number.int({min:18, max:54}),
    };
    users.push(user);
  }
  return users;
}
