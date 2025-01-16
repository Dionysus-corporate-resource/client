export function LogoCloud() {
  return (
    <section className="w-full py-12 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="text-sm font-medium text-muted-foreground">
            Нам доверяют ведущие компании
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
            {/* Здесь можно добавить логотипы компаний */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-center p-4 grayscale transition-all hover:grayscale-0"
              >
                <div className="h-8 w-32 bg-muted rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
