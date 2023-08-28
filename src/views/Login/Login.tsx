import { useState } from "react";
import { Form } from "../../components/form/Form";
import { ContentWrapper } from "../../components/layout/ContentWrapper";
import { Main } from "../../components/layout/Main";
import { ClientResponseOK, LoginState, User } from "../../types";
import { LoginSchema } from "../../validation/schemas";
import { useUser } from "../../contexts/user.context";
import { Link, useNavigate } from "react-router-dom";
import { usePromises } from "../../contexts/promises.context";
import { EmailInput } from "../../components/form/EmailInput";
import { PasswordInput } from "../../components/form/PasswordInput";
import { Button } from "../../components/common/Button";
import { Paragraph } from "../../components/common/Paragraph";

const defaultLoginState: LoginState = {
    email: '',
    password: '',
};

export const Login = () => {
    const { setError } = usePromises();
    const { setUser } = useUser();

    const navigate = useNavigate();

    const [form, setForm] = useState(defaultLoginState);

    const handleSuccess = (res: ClientResponseOK<User.Response>) => {
        setUser(res.results);
        navigate('/');
    };

    return (
        <ContentWrapper>
            <Main className="login">
                <Form
                    form={form}
                    options={{
                        path: 'auth/login',
                        body: form,
                        method: 'POST',
                    }}
                    validationSchema={LoginSchema}
                    className="login__form"
                    onError={e => setError(e.message)}
                    onSuccess={handleSuccess}
                >
                    <EmailInput
                        value={form.email}
                        onChange={e => setForm(s => ({ ...s, email: e.target.value }))}
                    />
                    <PasswordInput
                        value={form.password}
                        onChange={e => setForm(s => ({ ...s, password: e.target.value }))}
                    />
                    <Button>
                        Login
                    </Button>
                    <Paragraph className="login__info">
                        Don't have an account yet? <Link to="/register" className="link login__link">Sign up</Link> now!
                    </Paragraph>
                </Form>
            </Main>
        </ContentWrapper>
    );
};