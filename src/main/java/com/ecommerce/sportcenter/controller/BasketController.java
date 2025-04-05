package com.ecommerce.sportcenter.controller;

import com.ecommerce.sportcenter.entity.Basket;
import com.ecommerce.sportcenter.entity.BasketItem;
import com.ecommerce.sportcenter.model.BasketItemResponse;
import com.ecommerce.sportcenter.model.BasketResponse;
import com.ecommerce.sportcenter.service.BasketServiceImpl;
import com.ecommerce.sportcenter.service.iBasketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/baskets")
public class BasketController {
    private final iBasketService basketService;

    @Autowired
    public BasketController(iBasketService basketService) {
        this.basketService = basketService;
    }

    @GetMapping("/")
    public List<BasketResponse> getAllBaskets() {
        return basketService.getAllBaskets();
    }

    @GetMapping("/{basketId}")
    public BasketResponse getBasketById(@PathVariable String basketId) {
        return basketService.getBasketById(basketId);
    }

    @DeleteMapping("/{basketId")
    public void deleteBasketById(@PathVariable String basketId) {
        basketService.deleteBasketById(basketId);
    }

    @PostMapping("/createBasket")
    public ResponseEntity<BasketResponse> createBasket(@RequestBody BasketResponse basketResponse) {
        Basket basket = convertToBasketEntity(basketResponse);
        BasketResponse response = basketService.createBasket(basket);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    private Basket convertToBasketEntity(BasketResponse response) {
        Basket basket = new Basket();
        basket.setId(response.getId());
        basket.setItems(mapBasketItemsResponseToEntity(response.getItems()));
        return basket;
    }

    private List<BasketItem> mapBasketItemsResponseToEntity(List<BasketItemResponse> itemsResponse) {
        return itemsResponse.stream()
                .map(this::convertToBasketItemEntity)
                .collect(Collectors.toList());
    }

    private BasketItem convertToBasketItemEntity(BasketItemResponse itemResponse) {
        BasketItem basketItem = new BasketItem();
        basketItem.setId(itemResponse.getId());
        basketItem.setName(itemResponse.getName());
        basketItem.setDescription(itemResponse.getDescription());
        basketItem.setPrice(itemResponse.getPrice());
        basketItem.setImageUrl(itemResponse.getImageUrl());
        basketItem.setProductBrand(itemResponse.getProductBrand());
        basketItem.setProductType(itemResponse.getProductType());
        basketItem.setQuantity(itemResponse.getQuantity());
        return basketItem;
    }

}
