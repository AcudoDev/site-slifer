# 🚀 SLIFER - Site One-Page Futuriste

Site web one-page présentant le groupe SLIFER avec un design futuriste, épuré et moderne.

## 🎨 Design

- **Palette de couleurs** : Dark/Black, Cyan (#00ffff), Gris métallisé
- **Style** : Futuriste, spatial, épuré et classe
- **Typography** : Orbitron (titres) + Inter (texte)
- **Effets** : Animations, glow effects, particules, parallax

## 🏢 Présentation

### Slifer Solutions
- Solutions innovantes basées sur l'Intelligence Artificielle
- Automatisation intelligente
- Optimisation du ROI
- Solutions sur mesure

### Slifer Holdings
- Services spécialisés destinés aux acteurs de l'immobilier
- Modernisation des processus
- Reproductibilité des opérations
- Optimisation des opérations

## 🛠️ Technologies

- **HTML5** - Structure sémantique
- **CSS3** - Styles personnalisés avec animations
- **JavaScript** - Interactions et effets dynamiques
- **Tailwind CSS** (CDN) - Framework CSS utilitaire
- **AOS** (CDN) - Animations on scroll
- **Google Fonts** - Orbitron + Inter

## 📱 Responsive Design

Le site s'adapte parfaitement à tous les types d'écrans :

- **Desktop** (1024px+) : Division verticale des deux entités
- **Tablet** (768px-1024px) : Layout optimisé
- **Mobile** (480px-768px) : Colonnes empilées verticalement
- **Small Mobile** (<480px) : Interface compacte

## ✨ Fonctionnalités

### Animations
- ✅ Effet de glow sur le titre SLIFER
- ✅ Animation de float sur les logos
- ✅ Effet de parallax sur le background
- ✅ Particules animées
- ✅ Grille en mouvement
- ✅ Transitions au hover
- ✅ AOS (Animate On Scroll)

### Modales de Contact
- ✅ Deux modales distinctes (Solutions & Holdings)
- ✅ Formulaires avec validation
- ✅ Animations d'entrée/sortie
- ✅ Fermeture par Escape ou clic extérieur
- ✅ Simulation d'envoi avec notification
- ✅ Accessibilité (navigation clavier)

### Effets Visuels
- ✅ Background animé avec étoiles
- ✅ Grille cyberpunk en mouvement
- ✅ Effets de glow et de lumière
- ✅ Cartes avec effet 3D au survol
- ✅ Barres de séparation cyber
- ✅ Boutons avec animations de slide

## 🎯 Utilisation

1. **Ouvrir le site** : Lancez `index.html` dans un navigateur
2. **Navigation** : Le site est purement visuel, pas de menu
3. **Contact** : Cliquez sur les boutons "CONTACT" pour ouvrir les modales
4. **Responsive** : Testez sur différentes tailles d'écran

## 📁 Structure des Fichiers

```
Site Slifer/
├── index.html          # Structure HTML principale
├── style.css           # Styles CSS personnalisés
├── script.js           # JavaScript pour interactions
└── README.md           # Documentation
```

## 🔧 Personnalisation

### Logos
Remplacez les placeholders dans le HTML :
```html
<div class="w-32 h-32 bg-gradient-to-br from-cyber-cyan to-blue-500...">
    LOGO
</div>
```

### Couleurs
Modifiez les couleurs dans `tailwind.config` :
```javascript
colors: {
    'cyber-cyan': '#00ffff',        // Cyan principal
    'metallic-gray': '#8b8b8b',     // Gris métallisé
    'dark-bg': '#0a0a0a',           // Fond sombre
    'card-dark': '#1a1a1a',         // Cartes
}
```

### Contenu
Modifiez les textes directement dans `index.html` :
- Descriptions des entreprises
- Informations de contact
- Listes de services

## 🌟 Fonctionnalités Avancées

### Accessibilité
- ✅ Support du mode réduit de mouvement
- ✅ Navigation clavier pour les modales
- ✅ Contrastes respectés
- ✅ Sélection de texte stylisée

### Performance
- ✅ Animations optimisées avec requestAnimationFrame
- ✅ Throttling des événements de scroll/resize
- ✅ CDN pour les ressources externes
- ✅ CSS optimisé avec Tailwind

### Compatibilité
- ✅ Navigateurs modernes (Chrome, Firefox, Safari, Edge)
- ✅ Support mobile/tactile
- ✅ Écrans haute résolution (Retina)

### Footer Moderne
- ✅ Design épuré et professionnel
- ✅ Layout responsive (flex sur desktop, centré sur mobile)
- ✅ Copyright Slifer Solutions (société créatrice du site)
- ✅ Lien légal essentiel (Mentions légales)
- ✅ Espacement optimisé avec les cartes

## 📧 Intégration Backend (Future)

Pour connecter les formulaires à un backend :

1. Remplacez la simulation dans `submitForm()` par un appel API :
```javascript
fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, ...data })
});
```

2. Configurez votre serveur pour recevoir les données
3. Ajoutez la gestion d'erreurs appropriée

## 🎉 Prêt à l'emploi !

Le site est entièrement fonctionnel et prêt à être déployé. Tous les effets visuels, animations et interactions sont opérationnels.

---

*Développé avec passion pour SLIFER SOLUTIONS* ⚡
