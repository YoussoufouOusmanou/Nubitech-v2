# Processus de Développement et de Déploiement

Ce document décrit les étapes clés pour développer, configurer, et déployer cette application web moderne.

## 1. Comprendre l'Architecture

L'application est construite sur une stack moderne et performante :
- **Framework :** Next.js avec le App Router.
- **Langage :** TypeScript pour un code robuste et typé.
- **Styling :** Tailwind CSS pour le style utilitaire et ShadCN/UI pour les composants d'interface.
- **Fonctionnalités Serveur :** Genkit pour les interactions avec l'IA (comme les formulaires) et Nodemailer pour l'envoi d'e-mails.

## 2. Développement en Local

### Prérequis
- Node.js (version 20 ou supérieure)
- npm (ou un autre gestionnaire de paquets comme yarn ou pnpm)

### Étapes
1.  **Installer les dépendances :**
    ```bash
    npm install
    ```
2.  **Configurer les variables d'environnement :**
    -   Créez un fichier `.env` à la racine du projet en copiant `.env.example` s'il existe.
    -   Remplissez les variables nécessaires. **Ceci est crucial pour l'envoi d'e-mails via le formulaire de contact.**
        ```env
        # Adresse email où les messages du formulaire de contact seront envoyés
        SUPPORT_EMAIL=votre_email_de_support@example.com

        # Configuration du serveur d'envoi d'e-mails (SMTP)
        EMAIL_HOST=smtp.fournisseur.com
        EMAIL_PORT=587
        EMAIL_USER=votre_utilisateur_smtp
        EMAIL_PASS=votre_mot_de_passe_smtp
        ```
3.  **Lancer le serveur de développement :**
    ```bash
    npm run dev
    ```
    L'application sera accessible sur `http://localhost:9002`.

## 3. Déploiement avec Docker

Pour assurer un déploiement cohérent et portable, un `Dockerfile` est inclus. Il construit une image de production optimisée.

### Construire l'image Docker
À la racine de votre projet, exécutez la commande suivante :
```bash
docker build -t nubitech-app .
```
- `nubitech-app` est le nom que vous donnez à votre image. Vous pouvez le changer.

### Lancer le conteneur Docker
Une fois l'image construite, vous pouvez la lancer en local pour tester :
```bash
docker run -p 9002:9002 -e SUPPORT_EMAIL="votre_email@example.com" -e EMAIL_HOST="..." -e EMAIL_PORT="..." -e EMAIL_USER="..." -e EMAIL_PASS="..." nubitech-app
```
- `-p 9002:9002` mappe le port de votre machine au port du conteneur.
- `-e VARIABLE="..."` permet de passer les variables d'environnement nécessaires à l'application. **Vous devez fournir toutes les variables d'environnement requises pour que l'application fonctionne correctement.**

L'application sera alors accessible sur `http://localhost:9002` mais cette fois, elle s'exécute dans un conteneur Docker, comme elle le ferait en production.

## 4. Points Clés à Savoir et à Remplacer

1.  **Variables d'Environnement (`.env`) :**
    -   C'est le point le plus important. Sans les bonnes informations SMTP, **le formulaire de contact ne fonctionnera pas**. Vous devez obtenir ces informations auprès de votre fournisseur d'e-mails (Gmail, Outlook, SendGrid, etc.).
    -   Ne commitez **jamais** le fichier `.env` contenant des secrets dans un dépôt Git public. Utilisez les secrets de votre plateforme de déploiement (GitHub Secrets, Vercel Environment Variables, etc.).

2.  **Contenu et Textes (`src/locales/`) :**
    -   Tout le contenu textuel de l'application est géré via les fichiers `en.json` (anglais) et `fr.json` (français).
    -   Pour modifier un texte, trouvez la clé correspondante dans ces fichiers (par exemple, `hero.title.line1`) et changez sa valeur.

3.  **Images et Médias :**
    -   Les images des témoignages sont dans `/public/images/testimonials/`. Remplacez-les par vos propres images.
    -   Les images du blog sont actuellement des placeholders de `picsum.photos`. Pour un vrai blog, vous devrez gérer le téléversement et le stockage d'images.

4.  **Vidéo de Démonstration (`src/components/demo-video-dialog.tsx`) :**
    -   La vidéo de démonstration est actuellement une vidéo YouTube générique. Pour la remplacer, changez l'URL `src` de l'iframe dans ce fichier.

5.  **Logique Métier (Témoignages, Articles) :**
    -   Actuellement, l'ajout d'articles et de témoignages est **simulé côté client**. Les données sont perdues lors du rafraîchissement de la page.
    -   Pour une persistance réelle, il est **fortement recommandé** d'intégrer une base de données comme **Firebase Firestore**.

Ce guide vous donne les clés pour prendre en main et adapter l'application à vos besoins spécifiques.
