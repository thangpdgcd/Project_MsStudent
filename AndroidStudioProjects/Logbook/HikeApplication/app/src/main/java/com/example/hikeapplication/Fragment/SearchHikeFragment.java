package com.example.hikeapplication.Fragment;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.hikeapplication.ConnectDb;
import com.example.hikeapplication.Hike.Hike;
import com.example.hikeapplication.Hike.HikeAdapter;
import com.example.hikeapplication.R;

import java.util.List;

public class SearchHikeFragment extends Fragment {

    private RecyclerView recyclerView;
    private List<Hike> hikeList;
    private HikeAdapter hikeAdapter;
    private ConnectDb db;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        View view = inflater.inflate(R.layout.fragment_search_hike, container, false);

        recyclerView = view.findViewById(R.id.searchRecyclerView);
        EditText inputSearch = view.findViewById(R.id.inputSearch);
        Button searchButton = view.findViewById(R.id.search_btn);

        db = new ConnectDb(getContext());
        hikeList = db.getHike();
        hikeAdapter = new HikeAdapter(getContext(), getActivity(), hikeList);
        recyclerView.setAdapter(hikeAdapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));

        searchButton.setOnClickListener(v -> {
            String query = inputSearch.getText().toString();
            hikeAdapter.getFilter().filter(query);
        });

        return view;
    }
}
