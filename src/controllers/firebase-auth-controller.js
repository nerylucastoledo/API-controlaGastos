const { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendEmailVerification,
  sendPasswordResetEmail
} = require('../config/firebase');
const { createUser } = require('./userController');

const auth = getAuth();

class FirebaseAuthController {
  async registerUser(req, res) {
    const { email, password, salary, name, username } = req.body;

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const userCreated = await createUser({ name, username, salary });

      if (userCreated) {
        await sendEmailVerification(auth.currentUser);
        res.status(201).json({ message: "E-mail enviado! Usuário criado com sucesso!" });
      } else {
        throw new Error("Erro ao criar usuário no banco de dados");
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.message || "Ocorreu um erro ao criar o usuário";
      res.status(500).json({ error: errorMessage });
    }
  }

  loginUser(req, res) {
    const { email, password } = req.body;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => { 
          const idToken = userCredential._tokenResponse.idToken
            if (idToken) {
                res.cookie('access_token', idToken, {
                    httpOnly: true
                });
                res.status(200).json({ message: "Usuário logado com sucesso!", userCredential });
            } else {
                res.status(500).json({ error: "Ocorreu um erro interno!" });
            }
        })
        .catch((error) => {
            const errorMessage = error.message || "Ocorreu um erro ao tentar fazer o login!";
            res.status(500).json({ error: errorMessage });
        });
  }

  async logoutUser(req, res) {
    try {
      await signOut(auth);
      res.clearCookie('access_token');
      res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async resetPassword(req, res) {
    const { email } = req.body;

    if (!email) {
      return res.status(422).json({
        email: "Email is required"
      });
    }

    try {
      await sendPasswordResetEmail(auth, email);
      res.status(200).json({ message: "Password reset email sent successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new FirebaseAuthController();
