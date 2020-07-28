declare module 'faker/lib' {
  interface FakerOptions {
    locales?: unknown
  }

  const FakerClass: {
    new (options?: FakerOptions): Faker.FakerStatic
  }

  export default FakerClass
}
