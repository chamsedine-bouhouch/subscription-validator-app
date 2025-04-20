export function buildSOAPInscription(inscription) {
  return `
    <inscription>
      <id>${inscription.id}</id>
      <name>${inscription.name}</name>
      <lastname>${inscription.lastname}</lastname>
      <email>${inscription.email}</email>
      <validated>${inscription.validated}</validated>
      <bearer_token>${inscription.bearer_token ?? ''}</bearer_token>
      <validation_date>${inscription.validation_date ?? ''}</validation_date>
      <user_id>${inscription.user_id ?? ''}</user_id>
      <createdAt>${inscription.createdAt}</createdAt>
      <updatedAt>${inscription.updatedAt}</updatedAt>
    </inscription>
  `;
}

export function buildSOAPInscriptionsResponse(inscriptions) {
  const items = inscriptions.map(buildSOAPInscription).join('');

  return `
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <GetInscriptionsResponse>
          <inscriptions>
            ${items}
          </inscriptions>
        </GetInscriptionsResponse>
      </soap:Body>
    </soap:Envelope>
  `;
}
