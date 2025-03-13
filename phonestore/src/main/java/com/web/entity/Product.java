package com.web.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "product")
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    private String code;

    private String name;

    private Double price;

    private Double oldPrice;

    private String imageBanner;

    private String description;

    private Date createdDate;

    private Time createdTime;

    private Integer quantitySold;

    private String screen;

    private String frontCamera;

    private String backCamera;

    private String operaSystem;

    private String cpu;

    private String material;

    private String accessory;

    private String specialFeature;

    private String sim;

    private String securityInfor;

    private String mobileNetwork;

    private Boolean deleted = false;

    @ManyToOne
    @JoinColumn(name = "trademark_id")
    private TradeMark tradeMark;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "product", cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private List<ProductImage> productImages = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private List<ProductStorage> productStorages = new ArrayList<>();
}
