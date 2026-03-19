# DJfilm — Site Vitrine Jekyll / GitHub Pages

Site vitrine pour **DJfilm**, vidéaste professionnel basé à **Agen (Lot-et-Garonne)**.

---

## Arborescence du projet

```
djfilm.fr/
│
├── _config.yml                    # Configuration Jekyll principale
├── Gemfile                        # Dépendances Ruby/Jekyll
├── index.html                     # Page d'accueil
├── 404.html                       # Page d'erreur personnalisée
├── robots.txt                     # Instructions robots
├── sitemap.xml                    # Sitemap
├── manifest.json                  # Web App Manifest
│
├── _data/                         # ← DONNÉES ÉDITORIABLES EN JSON
│   ├── global.json                # Marque, contact, réseaux sociaux
│   ├── navigation.json            # Menus header et footer
│   ├── home.json                  # Contenu page d'accueil
│   ├── portfolio.json             # Projets du portfolio
│   ├── services.json              # Détail des prestations
│   ├── about.json                 # Page À propos
│   ├── contact.json               # Coordonnées et formulaire
│   ├── testimonials.json          # Témoignages clients
│   ├── faq.json                   # Questions / Réponses
│   └── legal.json                 # Mentions légales + confidentialité
│
├── _layouts/
│   ├── default.html               # Layout de base
│   ├── page.html                  # Layout page standard
│   └── home.html                  # Layout page d'accueil
│
├── _includes/
│   ├── head.html                  # Meta, polices, CSS, favicons
│   ├── seo-meta.html              # SEO : title, OG, Twitter, canonical
│   ├── schema.html                # Schema.org
│   ├── header.html                # En-tête + navigation
│   ├── footer.html                # Pied de page
│   └── components/
│       ├── page-hero.html
│       ├── cta-banner.html
│       ├── portfolio-card.html
│       ├── service-card.html
│       ├── testimonial-card.html
│       └── faq-item.html
│
├── _pages/
│   ├── portfolio.html             # /portfolio/
│   ├── services.html              # /services/
│   ├── a-propos.html              # /a-propos/
│   ├── contact.html               # /contact/
│   ├── temoignages.html           # /temoignages/
│   ├── faq.html                   # /faq/
│   ├── mentions-legales.html      # /mentions-legales/
│   └── politique-de-confidentialite.html
│
└── assets/
    ├── css/main.css               # CSS complet (design system, responsive)
    ├── js/main.js                 # JS vanilla minimal
    └── images/                    # → Remplacer par les vraies images
        ├── portfolio/
        ├── services/
        └── testimonials/
```

---

## Lancer en local

```bash
bundle install
bundle exec jekyll serve --livereload
# → http://localhost:4000
```

---

## Publier sur GitHub Pages

1. Pousser sur la branche `main`
2. **Settings → Pages** → branche `main`, dossier `/(root)`
3. Pour un domaine custom : ajouter `CNAME` à la racine + configurer DNS

---

## Données à personnaliser en priorité

| Fichier | À modifier |
|---------|-----------|
| `_data/global.json` | **Nom, téléphone, e-mail, SIRET, réseaux sociaux** |
| `_data/contact.json` | **ID Formspree** dans `form.action` |
| `_data/about.json` | **Nom du vidéaste**, bio, photo |
| `_data/portfolio.json` | **URLs Vimeo**, thumbnails, descriptions |
| `_data/testimonials.json` | Vrais témoignages clients |
| `_data/legal.json` | SIRET exact, adresse légale |
| `_config.yml` | `url:` + `google_analytics:` |

---

## Checklist avant mise en ligne

- [ ] Remplacer toutes les données de démo dans `_data/`
- [ ] Fournir toutes les images (voir arborescence)
- [ ] Configurer Formspree et tester le formulaire de contact
- [ ] Configurer Google Analytics dans `_config.yml`
- [ ] Vérifier les URLs Vimeo dans `portfolio.json`
- [ ] Tester mobile + desktop
- [ ] Soumettre le sitemap dans Google Search Console
- [ ] Tester Lighthouse (performance, SEO, accessibilité)