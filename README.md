# Nubitech - Plateforme de Déploiement Cloud

Ceci est le code source du projet de démonstration pour Nubitech, une plateforme moderne pour le déploiement d'applications web. Ce projet a été construit avec Next.js, TypeScript, Tailwind CSS, ShadCN/UI et Genkit pour les fonctionnalités IA.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :
- [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Procédure en cas de clone (Installation)

Pour configurer le projet en local après l'avoir cloné, suivez ces étapes :

1.  **Clonez le dépôt :**
    ```bash
    git clone https://github.com/votre-utilisateur/votre-repo.git
    cd votre-repo
    ```

2.  **Installez les dépendances :**
    ```bash
    npm install
    ```
    ou
    ```bash
    yarn install
    ```

3.  **Configurez les variables d'environnement :**
    -   Créez une copie du fichier `.env.example` et nommez-la `.env`.
        ```bash
        cp .env.example .env
        ```
    -   Ouvrez le fichier `.env` et remplissez les valeurs nécessaires. Les identifiants pour le serveur d'envoi d'e-mails (SMTP) sont requis pour que le formulaire de contact fonctionne.

4.  **Lancez le serveur de développement :**
    ```bash
    npm run dev
    ```
    Ouvrez [http://localhost:9002](http://localhost:9002) dans votre navigateur pour voir l'application.

## Scripts disponibles

-   `npm run dev` : Lance l'application en mode développement.
-   `npm run build` : Construit l'application pour la production.
-   `npm run start` : Démarre un serveur de production après un `build`.
-   `npm run lint` : Lance l'analyseur de code ESLint.

## Déploiement

Pour déployer ce projet, vous pouvez utiliser n'importe quelle plateforme d'hébergement supportant Next.js, comme [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/) ou [Firebase App Hosting](https://firebase.google.com/docs/hosting).

**Déploiement sur GitHub (Push du code) :**

1.  Assurez-vous que votre dépôt local est connecté à un dépôt distant sur GitHub.
2.  Commitez vos changements :
    ```bash
    git add .
    git commit -m "Mon commit"
    ```
3.  Poussez vos changements sur la branche principale :
    ```bash
    git push origin main
    ```

**Déploiement sur une plateforme (Ex: Vercel) :**

1.  Poussez votre code sur GitHub.
2.  Importez votre projet GitHub sur Vercel.
3.  Vercel détectera automatiquement qu'il s'agit d'un projet Next.js et le configurera pour vous.
4.  **Important :** N'oubliez pas d'ajouter vos variables d'environnement (du fichier `.env`) dans les paramètres de votre projet sur Vercel.

Le projet sera déployé et accessible via une URL fournie par la plateforme.
