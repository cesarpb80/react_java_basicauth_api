package junittest.junit;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import junittest.operations.OperationMath;

class OperationMathTest {

	@Test
	void test() {
		OperationMath operation = new OperationMath();
		int[] numbers = {1, 2, 3};
		int expectedResult = 6;
		int result = operation.calculateSum(numbers);
		System.out.println(result);
		assertEquals(expectedResult, result);
	}

}
