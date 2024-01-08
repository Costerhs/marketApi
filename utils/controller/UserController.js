import brcypt from 'bcryptjs';

export const register = async(req,res) => {
    try {
        const password = req.body.password;
        const salt = await brcypt.genSalt(10);
        const hash = await brcypt.hash(password,salt);

        
    }catch (e){
    
    }
}

