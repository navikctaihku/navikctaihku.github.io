/* OneChain contact email — same send contract as CertLedger's
   ContactClient + /api/sendemail, with this site's branding.

   The live mailer is CertLedger's public route. That route rebuilds a
   CertLedger template whenever `name` is present, so this client sends
   the finished HTML and leaves `name` off the payload. */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.OneChainContactEmail = factory();
})(typeof self !== "undefined" ? self : this, function () {
  var CONTACT_INBOX = "info@one-chain.io";
  var CONTACT_API = "https://app.certledger.io/api/sendemail";
  var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
  var LOGO_LIGHT = "https://navikctaihku.github.io/classic/onchain-logo-white.png";
  var LOGO_DARK = "https://navikctaihku.github.io/classic/onchain-logo.png";

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function applyTemplatePlaceholders(template, replacements) {
    return Object.keys(replacements).reduce(function (html, key) {
      return html.replace(new RegExp("\\[" + key + "\\]", "g"), replacements[key] == null ? "" : replacements[key]);
    }, template);
  }

  var CONTACT_INQUIRY_HTML = `<style>
  @media only screen and (max-width: 600px) {
    .contact-email-shell { width: 100% !important; max-width: 100% !important; }
    .contact-email-header { width: 100% !important; }
    .contact-email-header td { display: table-cell !important; width: auto !important; vertical-align: middle !important; }
    .contact-email-logo { width: 150px !important; max-width: 150px !important; height: auto !important; }
  }
</style>
<div style="display:none; max-height:0; overflow:hidden; opacity:0; color:transparent; mso-hide:all;">
  We received your message and will reply within one business day.
</div>

<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#ffffff;">
  <tr>
    <td align="center" style="padding:28px 12px;">
      <table role="presentation" class="contact-email-shell" cellpadding="0" cellspacing="0" border="0" width="100%"
        style="width:100%; max-width:600px;">
        <tr>
          <td style="background:#0a4a57; padding:18px 18px; border-radius:14px 14px 0 0;">
            <table role="presentation" class="contact-email-header" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
              <tr>
                <td align="left" valign="middle" style="white-space:nowrap; vertical-align:middle;">
                  <img class="contact-email-logo" src="${LOGO_LIGHT}" width="150" alt="OneChain"
                    style="display:block; border:0; outline:none; text-decoration:none; width:150px; max-width:150px; height:auto;" />
                </td>
                <td width="100%" valign="middle" style="font-size:0; line-height:0; vertical-align:middle;">&nbsp;</td>
                <td align="right" valign="middle" nowrap style="white-space:nowrap; vertical-align:middle; padding-left:12px;">
                  <span
                    style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; font-size:12px; letter-spacing:0.16em; text-transform:uppercase; color:#ffffff; font-weight:700; white-space:nowrap;">
                    Contact Us
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td
            style="background:#ffffff; border:1px solid #9ad4e2; border-top:0; border-radius:0 0 14px 14px; padding:22px 20px;">
            <p
              style="margin:0 0 10px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; font-size:16px; line-height:24px; color:#000000;">
              Dear <b>[NAME]</b>,
            </p>
            <p
              style="margin:0 0 16px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; font-size:14px; line-height:22px; color:#000000;">
              Thank you for contacting OneChain. We have received your message and usually reply within one business day.
            </p>
            <p
              style="margin:0 0 12px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; font-size:14px; line-height:22px; color:#000000;">
              Here is a copy of what you sent:
            </p>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
              style="margin:0 0 16px; background:#f8fafc; border:1px solid #9ad4e2; border-radius:8px;">
              <tr>
                <td style="padding:14px 16px;">
                  <p
                    style="margin:0 0 8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; font-size:13px; line-height:20px; color:#000000;">
                    <b>Name:</b> [NAME]
                  </p>
                  <p
                    style="margin:0 0 8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; font-size:13px; line-height:20px; color:#000000;">
                    <b>Email:</b> [EMAIL]
                  </p>
                  <p
                    style="margin:0 0 6px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; font-size:13px; line-height:20px; color:#000000;">
                    <b>Message:</b>
                  </p>
                  <p
                    style="margin:0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; font-size:13px; line-height:20px; color:#000000; white-space:pre-wrap;">[MESSAGE]</p>
                </td>
              </tr>
            </table>
            <p
              style="margin:0 0 16px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; font-size:14px; line-height:22px; color:#000000;">
              Our team will follow up using the email address you provided. If your enquiry is urgent, you can also reach us at <a href="mailto:${CONTACT_INBOX}" style="color:#0d7d91; text-decoration:none;">${CONTACT_INBOX}</a>.
            </p>
            <p
              style="margin:0 0 16px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; font-size:14px; line-height:22px; color:#000000;">
              Thank you for writing to us.
            </p>
            <p
              style="margin:0 0 16px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; font-size:14px; line-height:22px; color:#000000;">
              Regards,<br />OneChain Team
            </p>
            <div style="height:1px; background:#9ad4e2; margin:18px 0 14px;"></div>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td style="vertical-align:top;">
                  <div
                    style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; font-size:12px; line-height:18px; color:#000000; font-weight:800;">
                    OneChain
                  </div>
                  <div
                    style="margin-top:6px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; font-size:11px; line-height:16px; color:#000000;">
                    © 2026 OneChain Ltd. All rights reserved.
                  </div>
                  <div style="margin-top:10px;">
                    <a href="mailto:${CONTACT_INBOX}"
                      style="color:#0d7d91; text-decoration:none; font-size:11px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">Contact
                      to our CS Team</a>
                  </div>
                </td>
                <td align="right" style="vertical-align:top; width:140px; padding-left:12px;">
                  <img src="${LOGO_DARK}" width="120" alt="OneChain"
                    style="display:block; border:0; width:120px; max-width:120px; height:auto;" />
                </td>
              </tr>
            </table>
            <div
              style="margin-top:12px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; font-size:10px; line-height:14px; color:#000000; opacity:0.65;">
              This message was sent from the OneChain contact form.
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;

  function isValidContactEmail(value) {
    return EMAIL_PATTERN.test(value);
  }

  function buildContactInquiryEmail(params) {
    var name = escapeHtml(params.name || "");
    var email = escapeHtml(params.email || "");
    var message = escapeHtml(params.message || "");
    return {
      subject: "Contact OneChain — we received your message",
      text: "Name: " + (params.name || "") + "\nEmail: " + (params.email || "") + "\n\nMessage:\n" + (params.message || ""),
      html: applyTemplatePlaceholders(CONTACT_INQUIRY_HTML, {
        NAME: name,
        EMAIL: email,
        MESSAGE: message
      })
    };
  }

  return {
    CONTACT_INBOX: CONTACT_INBOX,
    CONTACT_API: CONTACT_API,
    isValidContactEmail: isValidContactEmail,
    buildContactInquiryEmail: buildContactInquiryEmail
  };
});
