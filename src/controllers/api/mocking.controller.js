import { mockingService } from "../../services/mocking.service.js";

export async function getMockingProducts(req, res, next) {
  try {
    const mockProducts = await mockingService.getMockedData();
    res.status(200).json(mockProducts);
  } catch (err) {
    next(err);
  }
}
