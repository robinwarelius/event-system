import { ErrorMessage, Field, Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite';
import * as Yup from 'yup';
import { useStore } from '../../app/store/store';

export default observer (function LoginForm() {
    const {userStore} = useStore();

    const validationSchema = Yup.object({
        email: Yup.string().required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    return (
        <Formik
        validationSchema={validationSchema}
        initialValues={{email: '', password: '', error: null}}
        onSubmit={(values, {setErrors}) => userStore.login(values).catch(error => 
            setErrors({error: 'Invalid email or password'}))}
        >
            {({handleSubmit, isValid, isSubmitting, dirty, errors}) => (
            <Form onSubmit={handleSubmit} autoComplete='off'>

                <div className="row justify-content-center">
                    <div className="col-lg-6">

                        <h2 className="mb-4">Login</h2>

                        <div className="mb-3">
                        <div className="input-group">
                        <span className="input-group-text">Email</span>
                            <Field className="form-control" name='email' />
                        </div>
                        <ErrorMessage name='email' render={error => <p className="text-danger">{error}</p>} />
                        </div>

                        <div className="mb-3">
                            <div className="input-group">
                            <span className="input-group-text">Password</span>
                                <Field className="form-control" name='password' />
                            </div>
                            <ErrorMessage name='password' render={error => <p className="text-danger">{error}</p>} />
                        </div>

                        <div>
                            <div className="input-group">
                            <ErrorMessage name='error' render={() => <p className="text-danger">{errors.error}</p>} />
                            </div>
                        </div>

                        <div className="list-group-item d-grid gap-2 d-md-flex justify-content-md-end">
                            <button disabled={!isValid || !dirty || isSubmitting} type='submit' className="btn btn-primary me-md-2 mt-2">Login</button>   
                        </div>

                    </div>
                </div>
            </Form>
            )}

        </Formik>
    )
})