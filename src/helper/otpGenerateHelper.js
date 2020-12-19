module.exports = {
    generateOTP: () => {
        let digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 4; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
    },

    generateRandomPassword: async (length) => {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
};