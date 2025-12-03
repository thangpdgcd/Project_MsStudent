package com.example.hikeapplication.Hike;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.FragmentTransaction;

import android.app.AlertDialog;
import android.app.DatePickerDialog;
import android.content.ContentValues;
import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Spinner;
import android.widget.Toast;

import com.example.hikeapplication.ConnectDb;
import com.example.hikeapplication.Fragment.HomeFragment;
import com.example.hikeapplication.Observation.ObservationsActivity;
import com.example.hikeapplication.R;
import com.google.android.material.bottomnavigation.BottomNavigationView;

import java.util.Calendar;

public class EditHikeActivity extends AppCompatActivity {

    private EditText name, location, date, length, description;
    private RadioGroup radioGroup;
    private RadioButton btn_yes, btn_no;
    private Spinner levelSpinner;
    private Button save_btn, dateButton, observation_btn;

    private DatePickerDialog datePickerDialog;

    // dữ liệu hiện tại của hike
    private String id_hike, name_hike, location_hike, date_hike,
            parking_hike, length_hike, level_hike, description_hike;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_hike);

        // Action Bar
        ActionBar ab = getSupportActionBar();
        if (ab != null) {
            ab.setDisplayHomeAsUpEnabled(true);
            ab.setTitle("Detail Hike");
        }

        // INIT VIEWS
        name = findViewById(R.id.name);
        location = findViewById(R.id.location);
        date = findViewById(R.id.date);
        length = findViewById(R.id.length);
        description = findViewById(R.id.description);
        radioGroup = findViewById(R.id.radioGroup);
        btn_yes = findViewById(R.id.radioButton_yes);
        btn_no = findViewById(R.id.radioButton_no);
        save_btn = findViewById(R.id.save_btn);
        dateButton = findViewById(R.id.dateButton);
        observation_btn = findViewById(R.id.observation_btn);
        levelSpinner = findViewById(R.id.levelSpinner);

        // SPINNER
        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(
                this,
                R.array.level,
                androidx.appcompat.R.layout.support_simple_spinner_dropdown_item
        );
        adapter.setDropDownViewResource(
                androidx.appcompat.R.layout.support_simple_spinner_dropdown_item
        );
        levelSpinner.setAdapter(adapter);

        // GET DATA FROM INTENT
        getAndSetData();

        // DATE PICKER
        initDatePicker();
        dateButton.setOnClickListener(v -> datePickerDialog.show());

        // SAVE BUTTON
        save_btn.setOnClickListener(v -> saveHike());

        // OBSERVATION BUTTON → mở màn danh sách Observations
        observation_btn.setOnClickListener(v -> {
            if (id_hike == null || id_hike.isEmpty()) {
                Toast.makeText(EditHikeActivity.this,
                        "Hike ID not found!", Toast.LENGTH_SHORT).show();
                return;
            }

            int hikeIdInt;
            try {
                hikeIdInt = Integer.parseInt(id_hike);
            } catch (NumberFormatException e) {
                Toast.makeText(EditHikeActivity.this,
                        "Invalid Hike ID!", Toast.LENGTH_SHORT).show();
                return;
            }

            Intent intent = new Intent(
                    EditHikeActivity.this,
                    ObservationsActivity.class
            );
            // dùng cùng key "hike_id" như ObservationsActivity & AddObservationsActivity
            intent.putExtra("hike_id", hikeIdInt);
            startActivity(intent);
        });
    }

    private void getAndSetData() {
        if (getIntent().hasExtra("id")) {
            id_hike = getIntent().getStringExtra("id");
            name_hike = getIntent().getStringExtra("name");
            location_hike = getIntent().getStringExtra("location");
            date_hike = getIntent().getStringExtra("date");
            parking_hike = getIntent().getStringExtra("parking");
            length_hike = getIntent().getStringExtra("length");
            level_hike = getIntent().getStringExtra("level");
            description_hike = getIntent().getStringExtra("description");

            name.setText(name_hike);
            location.setText(location_hike);
            date.setText(date_hike);
            length.setText(length_hike);
            description.setText(description_hike);

            if ("Yes".equalsIgnoreCase(parking_hike)) {
                btn_yes.setChecked(true);
            } else {
                btn_no.setChecked(true);
            }

            // Set spinner position
            ArrayAdapter adapter = (ArrayAdapter) levelSpinner.getAdapter();
            int pos = adapter.getPosition(level_hike);
            if (pos >= 0) {
                levelSpinner.setSelection(pos);
            }
        } else {
            Toast.makeText(this, "No hike data found!", Toast.LENGTH_SHORT).show();
        }
    }

    private void saveHike() {
        String nameValue = name.getText().toString().trim();
        String locationValue = location.getText().toString().trim();
        String dateValue = date.getText().toString().trim();
        String lengthValue = length.getText().toString().trim();
        String levelValue = levelSpinner.getSelectedItem().toString().trim();
        String descriptionValue = description.getText().toString().trim();

        int checkedId = radioGroup.getCheckedRadioButtonId();
        if (checkedId < 0 ||
                nameValue.isEmpty() ||
                locationValue.isEmpty() ||
                dateValue.isEmpty() ||
                lengthValue.isEmpty() ||
                levelValue.isEmpty() ||
                descriptionValue.isEmpty()) {
            showAlertDialog();
            return;
        }

        String parkingValue = (btn_yes.isChecked())
                ? btn_yes.getText().toString().trim()
                : btn_no.getText().toString().trim();

        ContentValues values = new ContentValues();
        values.put("id", id_hike);
        values.put("name", nameValue);
        values.put("location", locationValue);
        values.put("date", dateValue);
        values.put("parking", parkingValue);
        values.put("length", lengthValue);
        values.put("level", levelValue);
        values.put("description", descriptionValue);

        String message = "Hike will be updated:\n" +
                "Name: " + nameValue + "\n" +
                "Location: " + locationValue + "\n" +
                "Date: " + dateValue + "\n" +
                "Parking: " + parkingValue + "\n" +
                "Length: " + lengthValue + "\n" +
                "Level: " + levelValue + "\n" +
                "Description: " + descriptionValue + "\n\nAre you sure?";

        showConfirmDialog(message, values);
    }

    private void showAlertDialog() {
        new AlertDialog.Builder(this)
                .setTitle("Error")
                .setMessage("All required fields must be filled!")
                .setPositiveButton("OK", (dialog, which) -> dialog.dismiss())
                .show();
    }

    private void showConfirmDialog(String message, ContentValues values) {
        new AlertDialog.Builder(this)
                .setTitle("Confirmation")
                .setMessage(message)
                .setPositiveButton("OK", (dialog, which) -> {
                    ConnectDb db = new ConnectDb(EditHikeActivity.this);
                    db.editHike(
                            values.getAsString("id"),
                            values.getAsString("name"),
                            values.getAsString("location"),
                            values.getAsString("date"),
                            values.getAsString("parking"),
                            values.getAsString("length"),
                            values.getAsString("level"),
                            values.getAsString("description")
                    );

                    Toast.makeText(
                            EditHikeActivity.this,
                            "Hike updated!",
                            Toast.LENGTH_SHORT
                    ).show();

                    // Go back to HomeFragment
                    BottomNavigationView bottomNavigationView =
                            findViewById(R.id.bottomNavigationView);
                    if (bottomNavigationView != null) {
                        Menu menu = bottomNavigationView.getMenu();
                        MenuItem home = menu.findItem(R.id.home);
                        home.setChecked(true);
                    }
                    FragmentTransaction transaction =
                            getSupportFragmentManager().beginTransaction();
                    transaction.replace(R.id.frame_layout, new HomeFragment());
                    transaction.commit();
                    dialog.dismiss();
                })
                .setNegativeButton("Cancel",
                        (dialog, which) -> dialog.dismiss())
                .show();
    }

    private void initDatePicker() {
        Calendar cal = Calendar.getInstance();
        datePickerDialog = new DatePickerDialog(
                this,
                (DatePicker view, int year, int month, int dayOfMonth) -> {
                    month += 1;
                    date.setText(
                            String.format("%02d/%02d/%04d", dayOfMonth, month, year)
                    );
                },
                cal.get(Calendar.YEAR),
                cal.get(Calendar.MONTH),
                cal.get(Calendar.DAY_OF_MONTH)
        );
    }
}
