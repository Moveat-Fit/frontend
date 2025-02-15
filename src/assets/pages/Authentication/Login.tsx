import { Avatar, Button, Checkbox, CssBaseline, FormControlLabel, Grid, Link, TextField, Typography } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';

export default function Login() {
    return (
        <section className="max-w-sm block mx-auto ">
            <CssBaseline />
            <div className="mt-20 flex flex-col items-center ">
                <Avatar className="m-2">
                    <LockIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Entrar
                </Typography>
                <div className="w-full mt-1">
                    <TextField
                        type="email"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="E-mail"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Senha"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        className="mb-1"
                        control={<Checkbox value="remember" color="primary" />}
                        label="Lembrar senha"
                    />
                </div>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Entrar
                </Button>

                <Grid container className="m-2">
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Esqueceu a senha?
                        </Link>
                    </Grid>
                    <Grid item >
                        <Link href="#" variant="body2">
                            Não tem uma conta? <b>Cadastre-se</b>
                        </Link>
                    </Grid>
                </Grid>
            </div>

        </section>
    )
} 