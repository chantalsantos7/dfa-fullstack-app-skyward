import bcrypt from 'bcrypt';

// const encryptPassword = async (next) => {

//     const saltRounds = 10;
//     try {
//         console.log(`am I being reached?`);
//         if (this.isModified('password')) {
//             this.password = await bcrypt.hash(this.password, saltRounds);
//         }
//         next();
//     }
//     catch (e) {
//         throw new Error(e.message);
//     }
// }

const encryptPassword = async (password) => {
    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }
    catch (e) {
        throw new Error(e);
    }
}

const signupServices = { encryptPassword };

export default signupServices;