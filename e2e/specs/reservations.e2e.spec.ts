describe('Reservations', () => {
  let jwt: string;

  beforeAll(async () => {
    const user = {
      email: 'willman0032@gmail.com',
      password: 'StrongPass@123',
    };
    // Create user
    await fetch('http://auth:3001/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // Login
    const response = await fetch('http://auth:3001/auth/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    jwt = await response.text();
  });

  test('Create & Get', async () => {
    const createdReservation = await createReservation();
    const responseGet = await fetch(
      `http://reservations:3000/reservations/${createdReservation._id}`,
      {
        headers: {
          Authentication: jwt,
        },
      },
    );
    const reservation = await responseGet.json();
    expect(createdReservation).toEqual(reservation);
  });

  const createReservation = async () => {
    const responseCreate = await fetch(
      'http://reservations:3000/reservations',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authentication: jwt,
        },
        body: JSON.stringify({
          startDate: '07-11-2023',
          endDate: '07-11-2023',
          invoiceId: '23',
          placeId: '2',
          charge: {
            card: {
              cvc: '413',
              exp_month: 12,
              exp_year: 27,
              number: '4242 4242 4242 4242',
            },
            amount: 5,
          },
        }),
      },
    );
    expect(responseCreate.ok).toBeTruthy();
    return await responseCreate.json();
  };
});
