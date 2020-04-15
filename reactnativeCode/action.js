import { clientApi } from ".";

export default {
  createInscriptions: async inscriptions => {
    try {
      const response = await clientApi
        .getClient()
        .post(`/inscriptions`, inscriptions);
      return response.data;
    } catch (error) {}
  }
}
  