# chatMe: Business Chat Application & Escrow

The project is aimed at providing a platform for online vendors and customers to transact securely, providing a kind of escrow system to protect both user interest and customer products.

Note that the APP so far has no mobile configuration and can only be used on Desktop.

## Developer Guide to Folder Structure

* `/pages/`: The pages directory holds the authentication files; the sign in and sign up components.

* `/lib/`: The lib directory contains configurations on the server level for firebase, chat store, uploads, etc.

    * `/lib/firebase.js`: Configures and initializes Firebase services including authentication, Firestore, and storage.
    
    * `/lib/chatStore.js`: Manages the state related to chat information using Zustand, including user block statuses and chat details.

    * `/lib/uploads.js`: Handles file uploads to Firebase Storage and provides download URLs for uploaded files.

    * `/lib/useBlob.js`: Custom React hook for recording and managing audio blobs using the MediaRecorder API.

    * `/lib/userStore.js`: Manages user-related state with Zustand, including user details and authentication status.

* `/components/Modal.jsx`: This file protects the system from mobile use as it is not currently compatible with mobile.
# chatM
