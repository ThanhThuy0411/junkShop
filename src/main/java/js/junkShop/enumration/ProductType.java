package js.junkShop.enumration;

public enum ProductType {
    books("Sach",0),
    houseWare("Do gia dung",1),
    other("Khac",2);

    private final String key;
    private final Integer value;

    ProductType(String key, Integer value) {
        this.key = key;
        this.value = value;
    }


    public String getKey() {
        return key;
    }

    public Integer getValue() {
        return value;
    }
}
