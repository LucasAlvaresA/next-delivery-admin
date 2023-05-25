export const api = {
    login: async (email: string, password: string): Promise<{error: string, token?: string}> => {
        return new Promise(resolve => {
            setTimeout(() => {
                // This fake email is only for alerts front end test
                if(email !== 'test@test.com') {
                    resolve({
                        error: 'Email not found'
                    });
                } else {
                    resolve({
                        error: '',
                        token: '123'
                    });
                }
            }, 1000)
        })
    }
}