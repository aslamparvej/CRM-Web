const companies = [
  "Northwind",
  "Basalt Labs",
  "Ferro & Co",
  "Kettlecorn",
  "Vantage Point",
  "Argus Systems",
];

const TrustedCompanies = () => {
  return (
    <section className="border-b border-border py-12">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center font-data text-xs uppercase tracking-wider text-muted-foreground">
          Trusted by sales teams at
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {companies.map((name) => (
            <span
              key={name}
              className="font-display text-lg font-medium text-muted-foreground/60"
            >
              {name}
            </span>
            
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedCompanies;
