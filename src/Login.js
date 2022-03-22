import { useEffect, useRef, useState } from "react"
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export const Login = () => {
    const [value, setValue] = useState('');
    const [loginTrue, setloginTrue] = useState(true);
    const recaptchaVerifier = useRef();
    const confirmationResult = useRef();

    useEffect(() => {
        const auth = getAuth();
        recaptchaVerifier.current = new RecaptchaVerifier('recaptcha-container', {}, auth);
    }, [])

    const onClickLogin = async () => {
        const auth = getAuth();
        const phoneNumber = '+976'+value;
        console.log(phoneNumber)
        confirmationResult.current = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier.current);

        setValue('');
        setloginTrue(false);
    }

    const onClickCheckCode = async () => {
        const code = value;

        await confirmationResult.current.confirm(code);
    }

    return (
        <div>
            {loginTrue ? (
                <div>
                    <div id="recaptcha-container"></div>
                    <input type="number" placeholder="Дугаараа оруулна уу" value={value} onChange={(e) => setValue(e.target.value)} />
                    <button onClick={onClickLogin}>Login</button>
                </div>
            ) : (
                <div>
                    <input type="text" placeholder="баталгаажуулах код " value={value} onChange={(e) => setValue(e.target.value)} />
                    <button onClick={onClickCheckCode}>confirm code</button>
                </div>
            )
            }
        </div>
    )
}
