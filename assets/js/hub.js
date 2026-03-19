/* ===============================================================
   DJfilm · Hub — hub.js
   =============================================================== */

const CONTACT_DATA_URL = 'assets/data/contact.json';

function revealOnLoad() {
  const items = document.querySelectorAll('[data-reveal]');

  items.forEach((el, i) => {
    const rawDelay = el.dataset.delay;
    const delay = rawDelay !== undefined ? parseInt(rawDelay, 10) : i * 80;

    setTimeout(() => {
      el.classList.add('is-visible');
    }, delay);
  });
}

function getValueByPath(source, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), source);
}

function applyMappedValues(data) {
  document.querySelectorAll('[data-href-key]').forEach((el) => {
    const value = getValueByPath(data, el.dataset.hrefKey);
    if (typeof value === 'string' && value.length > 0) {
      el.setAttribute('href', value);
    }
  });

  document.querySelectorAll('[data-content-key]').forEach((el) => {
    const value = getValueByPath(data, el.dataset.contentKey);
    if (typeof value === 'string' && value.length > 0) {
      el.setAttribute('content', value);
    }
  });

  document.querySelectorAll('[data-text-key]').forEach((el) => {
    const value = getValueByPath(data, el.dataset.textKey);
    if (typeof value === 'string') {
      el.textContent = value;
    }
  });
}

function applySchema(data) {
  const schemaNode = document.querySelector('#schema-data');
  if (!schemaNode) {
    return;
  }

  const schema = {
    '@context': data.meta.schemaContext,
    '@type': 'Person',
    name: 'Djibril Diallo',
    jobTitle: 'Videaste professionnel',
    worksFor: { '@type': 'Organization', name: 'DJfilm' },
    url: data.schema.url,
    email: data.schema.email,
    telephone: data.schema.telephone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Agen',
      postalCode: '47000',
      addressRegion: 'Lot-et-Garonne',
      addressCountry: 'FR'
    },
    sameAs: data.schema.sameAs
  };

  schemaNode.textContent = JSON.stringify(schema, null, 2);
}

function escapeVCardValue(value) {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}

function buildVCard(data) {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${escapeVCardValue(data.vcard.fullName)}`,
    `N:${escapeVCardValue(data.vcard.lastName)};${escapeVCardValue(data.vcard.firstName)};;;`,
    `ORG:${escapeVCardValue(data.vcard.organization)}`,
    `TITLE:${escapeVCardValue(data.vcard.title)}`,
    `TEL;TYPE=CELL:${escapeVCardValue(data.contacts.phoneE164)}`,
    `EMAIL;TYPE=INTERNET:${escapeVCardValue(data.contacts.email)}`,
    `URL:${escapeVCardValue(data.links.website)}`,
    `ADR;TYPE=WORK:;;${escapeVCardValue(data.vcard.addressLocality)};${escapeVCardValue(data.vcard.addressRegion)};${escapeVCardValue(data.vcard.postalCode)};${escapeVCardValue(data.vcard.country)}`,
    `X-SOCIALPROFILE;type=instagram:${escapeVCardValue(data.links.instagram)}`,
    `X-SOCIALPROFILE;type=vimeo:${escapeVCardValue(data.links.showreel)}`,
    `X-SOCIALPROFILE;type=linkedin:${escapeVCardValue(data.links.linkedinCompany)}`,
    `X-SOCIALPROFILE;type=youtube:${escapeVCardValue(data.links.youtube)}`,
    `NOTE:${escapeVCardValue(data.vcard.note)}`,
    'END:VCARD'
  ];

  return `${lines.join('\r\n')}\r\n`;
}

function applyVCardLink(data) {
  const vCardLink = document.querySelector('[data-vcard-download]');
  if (!vCardLink) {
    return;
  }

  const vCardContent = buildVCard(data);
  const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8' });
  const objectUrl = URL.createObjectURL(blob);

  vCardLink.setAttribute('href', objectUrl);
  vCardLink.setAttribute('download', data.vcard.fileName || 'contact.vcf');

  window.addEventListener(
    'pagehide',
    () => {
      URL.revokeObjectURL(objectUrl);
    },
    { once: true }
  );
}

async function loadContactData() {
  const response = await fetch(CONTACT_DATA_URL);
  if (!response.ok) {
    throw new Error(`Unable to load contact data (${response.status})`);
  }

  return response.json();
}

document.addEventListener('DOMContentLoaded', async () => {
  revealOnLoad();

  try {
    const data = await loadContactData();
    applyMappedValues(data);
    applySchema(data);
    applyVCardLink(data);
  } catch (error) {
    console.error('Unable to apply contact config:', error);
  }
});
