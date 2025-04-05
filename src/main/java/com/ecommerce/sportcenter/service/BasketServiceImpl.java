package com.ecommerce.sportcenter.service;

import com.ecommerce.sportcenter.entity.Basket;
import com.ecommerce.sportcenter.entity.BasketItem;
import com.ecommerce.sportcenter.model.BasketItemResponse;
import com.ecommerce.sportcenter.model.BasketResponse;
import com.ecommerce.sportcenter.repository.BasketRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Log4j2
public class BasketServiceImpl implements iBasketService{
    private final BasketRepository basketRepository;

    @Autowired
    public BasketServiceImpl(BasketRepository basketRepository) {
        this.basketRepository = basketRepository;
    }


    @Override
    public List<BasketResponse> getAllBaskets() {
        log.info("Fetching all baskets");
        // Crud repo return Iterator, must use stream operator to get the list
        List<Basket> basketList = (List<Basket>) basketRepository.findAll();

        List<BasketResponse> responses = basketList
                .stream().map(this::convertToBasketResponse)
                .collect(Collectors.toList());
        return responses;
    }

    private BasketResponse convertToBasketResponse(Basket basket) {
        if (basket == null)
            return null;

        List<BasketItemResponse> itemResponses = basket.getItems().stream()
                .map(this::convertToBasketItemResponse)
                .collect(Collectors.toList());

        return BasketResponse.builder()
                 .id(basket.getId())
                 .items(itemResponses)
                 .build();
    }

    private BasketItemResponse convertToBasketItemResponse(BasketItem basketItem) {
        return BasketItemResponse.builder()
                .id(basketItem.getId())
                .name(basketItem.getName())
                .description(basketItem.getDescription())
                .price(basketItem.getPrice())
                .imageUrl(basketItem.getImageUrl())
                .productBrand(basketItem.getProductBrand())
                .productType(basketItem.getProductType())
                .quantity(basketItem.getQuantity())
                .build();
    }

    @Override
    public BasketResponse getBasketById(String basketId) {
        Optional<Basket> basketOptional = basketRepository.findById(basketId);
        if (basketOptional.isPresent()) {
            Basket basket = basketOptional.get();
            log.info("Fetched basket by id: {}", basket);
            return convertToBasketResponse(basket);
        } else {
            log.info("Basket not found by id: {}", basketId);
            return null;
        }
    }

    @Override
    public void deleteBasketById(String basketId) {
        log.info("Deleting basket by id: {}", basketId);
        basketRepository.deleteById(basketId);
        log.info("Deleted basket by id: {}", basketId);
    }

    @Override
    public BasketResponse createBasket(Basket basket) {
        log.info("Creating basket: {}", basket);
        Basket savedBasket = basketRepository.save(basket);
        log.info("Created basket with id    : {}", savedBasket.getId());
        return convertToBasketResponse(savedBasket);
    }
}
