import faker from "faker";
import User from "./api/models/user.model";
import { random } from "lodash";

const seedUsers = async () => {
  const currentUsers = await User.list({});
  if (!currentUsers.length) {
    console.log("[Seed] fill new users");

    const newUsers = Array(20)
      .fill(0)
      .map(() => ({
        email: faker.internet.email(),
        password: "123456",
        name: faker.name.findName(),
        age: random(8, 85),
        phone: faker.phone.phoneNumber(),
        mailAddress: {
          address: faker.address.streetAddress(),
          city: faker.address.city(),
          state: faker.address.state(),
          zip: faker.address.zipCode()
        },
        role: User.roles[random(0, 1)]
      }));

    console.log(newUsers);

    await Promise.all(
      newUsers.map(async user => {
        const newUser = new User(user);
        await newUser.save();
        return newUser;
      })
    );

    console.log("[Seed] user seeded");
  }
};

const seed = async () => {
  await seedUsers();
};

export default seed;
