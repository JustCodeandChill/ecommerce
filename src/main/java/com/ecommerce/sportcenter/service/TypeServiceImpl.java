package com.ecommerce.sportcenter.service;

import com.ecommerce.sportcenter.entity.Type;
import com.ecommerce.sportcenter.model.TypeResponse;
import com.ecommerce.sportcenter.repository.TypeRepository;
import lombok.extern.java.Log;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
public class TypeServiceImpl implements TypeService {
    private final TypeRepository typeRepository;
    @Autowired
    public TypeServiceImpl(TypeRepository typeRepository) {
        this.typeRepository = typeRepository;
    }
    @Override
    public List<TypeResponse> getAllTypes() {
        log.info("geting AllTypes");
        List<Type> types = typeRepository.findAll();
        List<TypeResponse> typeResponses = types.stream().map(this::convertToTypeResponse)
                .collect(Collectors.toList());

        return typeResponses;
    }

    private TypeResponse convertToTypeResponse(Type type) {
        return TypeResponse.builder().id(type.getId()).name(type.getName()).build();
    }
}
