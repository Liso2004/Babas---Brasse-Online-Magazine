function required(environment, name) {
  const value = String(environment[name] || "").trim();
  if (!value) throw new Error(`${name} is required when NODE_ENV=production.`);
  return value;
}

function validateProductionConfig(environment = process.env) {
  if (environment.NODE_ENV !== "production") return { production: false };

  const adminEmail = required(environment, "BABAS_ADMIN_EMAIL");
  const passwordHash = required(environment, "BABAS_ADMIN_PASSWORD_HASH");
  const databaseUrl = required(environment, "DATABASE_URL");

  if (environment.BABAS_ADMIN_PASSWORD) {
    throw new Error("BABAS_ADMIN_PASSWORD is not allowed in production. Use BABAS_ADMIN_PASSWORD_HASH.");
  }
  if (!passwordHash.startsWith("scrypt$")) {
    throw new Error("BABAS_ADMIN_PASSWORD_HASH must use the scrypt format.");
  }

  return {
    production: true,
    adminEmail,
    passwordHash,
    databaseUrl
  };
}

module.exports = { validateProductionConfig };
