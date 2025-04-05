package com.ecommerce.sportcenter.exceptions;

import com.ecommerce.sportcenter.model.CustomErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class CustomExceptionHandler  extends ResponseEntityExceptionHandler {
    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<Object> handleProductNotFoundException(ProductNotFoundException ex, WebRequest wr) {
        CustomErrorResponse response = new CustomErrorResponse(HttpStatus.NOT_FOUND, "Product doesnot exist", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);

    }
}
