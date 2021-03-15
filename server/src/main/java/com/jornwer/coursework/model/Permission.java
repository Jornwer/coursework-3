package com.jornwer.coursework.model;

public enum Permission {
    DEVELOPERS_READ("read"),
    DEVELOPERS_WRITE("write");

    private final String permission;

    Permission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
