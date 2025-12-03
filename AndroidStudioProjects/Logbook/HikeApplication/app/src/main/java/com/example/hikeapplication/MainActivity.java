package com.example.hikeapplication;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import com.example.hikeapplication.Fragment.AddHikeFragment;
import com.example.hikeapplication.Fragment.HomeFragment;
import com.example.hikeapplication.Fragment.SearchHikeFragment;
import com.example.hikeapplication.databinding.ActivityMainBinding;
import com.google.android.material.bottomnavigation.BottomNavigationView;

public class MainActivity extends AppCompatActivity {
    ActivityMainBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        BottomNavigationView bottomNavigationView = findViewById(R.id.bottomNavigationView);
        bottomNavigationView.setOnItemSelectedListener(item -> {
            int itemId = item.getItemId();
            if (itemId == R.id.add) {
                replaceFragment(new AddHikeFragment());
            } else if (itemId == R.id.home) {
                replaceFragment(new HomeFragment()); // sử dụng fragment gốc
            } else if (itemId == R.id.search) {
                replaceFragment(new SearchHikeFragment());
            }
            return true;
        });

        // Display screen HomeFragment formal when open app
        replaceFragment(new HomeFragment());
    }

    public void replaceFragment(Fragment fragment) {
        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.frame_layout, fragment)
                .commit();
    }
}
