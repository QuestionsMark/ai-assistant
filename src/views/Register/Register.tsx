import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/common/Button";
import { Paragraph } from "../../components/common/Paragraph";
import { EmailInput } from "../../components/form/EmailInput";
import { Form } from "../../components/form/Form";
import { PasswordInput } from "../../components/form/PasswordInput";
import { ContentWrapper } from "../../components/layout/ContentWrapper";
import { Main } from "../../components/layout/Main";
import { usePromises } from "../../contexts/promises.context";
import { useState } from "react";
import { ClientResponseOK, RegisterState } from "../../types";
import { RegisterSchema } from "../../validation/schemas";
import { TextInput } from "../../components/form/TextInput";

const defaultRegisterState: RegisterState = {
    confirmPassword: '',
    email: '',
    password: '',
    username: '',
};

export const Register = () => {
    const { setError, setMessage } = usePromises();

    const navigate = useNavigate();

    const [form, setForm] = useState(defaultRegisterState);

    const handleSuccess = (res: ClientResponseOK<string>) => {
        setMessage(res.results);
        navigate('/login');
    };

    return (
        <ContentWrapper>
            <Main className="login">
                <Form
                    form={form}
                    options={{
                        path: '/user',
                        body: form,
                        method: 'POST',
                    }}
                    validationSchema={RegisterSchema}
                    className="login__form"
                    onError={e => setError(e.message)}
                    onSuccess={handleSuccess}
                >
                    <h2 className="login__title">Register</h2>
                    <EmailInput
                        value={form.email}
                        onChange={e => setForm(s => ({ ...s, email: e.target.value }))}
                    />
                    <PasswordInput
                        value={form.password}
                        onChange={e => setForm(s => ({ ...s, password: e.target.value }))}
                    />
                    <PasswordInput
                        value={form.confirmPassword}
                        onChange={e => setForm(s => ({ ...s, confirmPassword: e.target.value }))}
                    />
                    <TextInput
                        value={form.username}
                        onChange={e => setForm(s => ({ ...s, username: e.target.value }))}
                        placeholder="Username"
                    />
                    <Button>
                        Register
                    </Button>
                    <Paragraph className="login__info">
                        Login <Link to="/login" className="link login__link">here</Link>!
                    </Paragraph>
                </Form>
            </Main>
        </ContentWrapper>
    );
};