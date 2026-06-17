// ─── lib/rentalUtils.js (inlined) ────────────────────────────────────────────
// In your project: import { getRentalReport, getGenreReport } from "./lib/rentalUtils"

const rentals = [
  { id: 1, customer: "Alex",   movie: "Inception",       genre: "Sci-Fi",  daysRented: 3, dailyRate: 4.99, isReturned: true,  membershipTier: "gold"   },
  { id: 2, customer: "Jordan", movie: "The Dark Knight", genre: "Action",  daysRented: 5, dailyRate: 3.99, isReturned: false, membershipTier: "silver" },
  { id: 3, customer: "Sam",    movie: "Interstellar",    genre: "Sci-Fi",  daysRented: 2, dailyRate: 4.99, isReturned: true,  membershipTier: "none"   },
  { id: 4, customer: "Taylor", movie: "The Notebook",    genre: "Romance", daysRented: 7, dailyRate: 2.99, isReturned: true,  membershipTier: "gold"   },
  { id: 5, customer: "Morgan", movie: "Oppenheimer",     genre: "Drama",   daysRented: 4, dailyRate: 4.99, isReturned: false, membershipTier: "silver" },
  { id: 6, customer: "Casey",  movie: "Dunkirk",         genre: "Action",  daysRented: 3, dailyRate: 3.99, isReturned: true,  membershipTier: "none"   },
];

function getReturnedRentals(list) {
  return list.filter((r) => r.isReturned);
}

function calculateRentalCost(rental) {
  const baseCost = rental.daysRented * rental.dailyRate;
  const discount =
    rental.membershipTier === "gold"   ? 0.20 :
    rental.membershipTier === "silver" ? 0.10 : 0;
  const cost = Math.round(baseCost * (1 - discount) * 100) / 100;
  return { ...rental, cost };
}

function getTotalRevenue(list) {
  const total = list.reduce((sum, r) => sum + (r.cost ?? 0), 0);
  return Math.round(total * 100) / 100;
}

function getGenreRentals(genre, list) {
  return list.filter((r) => r.genre === genre);
}

function getRentalReport(list) {
  const returned      = getReturnedRentals(list);
  const withCosts     = returned.map(calculateRentalCost);
  const totalRevenue  = getTotalRevenue(withCosts);
  const mostExpensive = withCosts.reduce((max, r) => (r.cost > max.cost ? r : max));
  return { totalReturned: withCosts.length, totalRevenue, mostExpensive, returnedRentals: withCosts };
}

function getGenreReport(genre, list) {
  const genreRentals = getGenreRentals(genre, list);
  const withCosts    = genreRentals.map(calculateRentalCost);
  const totalRevenue = getTotalRevenue(withCosts);
  return { genre, totalRentals: withCosts.length, totalRevenue };
}

// ─── RentalDashboard ─────────────────────────────────────────────────────────

export default function RentalDashboard() {
  const { totalReturned, totalRevenue, mostExpensive, returnedRentals } =
    getRentalReport(rentals);

  const sciFi  = getGenreReport("Sci-Fi", rentals);
  const action = getGenreReport("Action", rentals);

  return (
    <div className="container py-4">

      {/* ── Header ── */}
      <div className="mb-4">
        <h1 className="h3 fw-bold mb-1">Rental Dashboard</h1>
        <p className="text-muted mb-0">Returned rentals · revenue after membership discounts</p>
      </div>

      {/* ── Overview stat cards ── */}
      <p className="text-uppercase fw-semibold text-muted small mb-2">Overview</p>
      <div className="row g-3 mb-4">

        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted small mb-1">Total returned</p>
              <p className="h3 fw-bold mb-0">{totalReturned}</p>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted small mb-1">Total revenue</p>
              <p className="h3 fw-bold mb-0">${totalRevenue.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted small mb-1">Most expensive</p>
              <p className="h3 fw-bold mb-0">${mostExpensive.cost.toFixed(2)}</p>
              <p className="text-muted small mb-0">{mostExpensive.customer}</p>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted small mb-1">Movies tracked</p>
              <p className="h3 fw-bold mb-0">{rentals.length}</p>
            </div>
          </div>
        </div>

      </div>

      {/* ── Genre breakdown ── */}
      <p className="text-uppercase fw-semibold text-muted small mb-2">Genre breakdown</p>
      <div className="row g-3 mb-4">

        <div className="col-6">
          <div className="card border-0 shadow-sm h-100 bg-primary bg-opacity-10">
            <div className="card-body">
              <p className="fw-bold text-primary small text-uppercase mb-1">Sci-Fi</p>
              <p className="h4 fw-bold text-primary mb-0">${sciFi.totalRevenue.toFixed(2)}</p>
              <p className="text-primary small mb-0 opacity-75">{sciFi.totalRentals} rentals</p>
            </div>
          </div>
        </div>

        <div className="col-6">
          <div className="card border-0 shadow-sm h-100 bg-danger bg-opacity-10">
            <div className="card-body">
              <p className="fw-bold text-danger small text-uppercase mb-1">Action</p>
              <p className="h4 fw-bold text-danger mb-0">${action.totalRevenue.toFixed(2)}</p>
              <p className="text-danger small mb-0 opacity-75">{action.totalRentals} rentals</p>
            </div>
          </div>
        </div>

      </div>

      {/* ── Rentals table ── */}
      <p className="text-uppercase fw-semibold text-muted small mb-2">Returned rentals</p>
      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">

            <thead className="table-light">
              <tr>
                <th className="text-uppercase text-muted small fw-semibold">Customer</th>
                <th className="text-uppercase text-muted small fw-semibold">Movie</th>
                <th className="text-uppercase text-muted small fw-semibold">Genre</th>
                <th className="text-uppercase text-muted small fw-semibold">Days</th>
                <th className="text-uppercase text-muted small fw-semibold">Tier</th>
                <th className="text-uppercase text-muted small fw-semibold">Cost</th>
              </tr>
            </thead>

            <tbody>
              {returnedRentals.map((r) => (
                <tr key={r.id}>
                  <td className="fw-semibold">{r.customer}</td>
                  <td>{r.movie}</td>
                  <td>
                    <span className="badge bg-secondary bg-opacity-10 text-secondary">
                      {r.genre}
                    </span>
                  </td>
                  <td className="text-muted">{r.daysRented}d</td>
                  <td>
                    {r.membershipTier === "gold" && (
                      <span className="badge bg-warning bg-opacity-25 text-warning-emphasis">Gold</span>
                    )}
                    {r.membershipTier === "silver" && (
                      <span className="badge bg-primary bg-opacity-10 text-primary">Silver</span>
                    )}
                    {r.membershipTier === "none" && (
                      <span className="badge bg-light text-muted">None</span>
                    )}
                  </td>
                  <td className="fw-bold">${r.cost.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
        <div className="card-footer bg-white text-muted small">
          {returnedRentals.length} rentals · discounts applied per membership tier
        </div>
      </div>

    </div>
  );
}
